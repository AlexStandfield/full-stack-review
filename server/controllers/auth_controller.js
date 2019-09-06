const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    // body info
    const {email, password, first_name, last_name, pin} = req.body;
    // db instance
    const db = req.app.get('db');
    // look for an existing user with the email
    const foundUser = await db.find_user([email]);
    // check to see if the foundUser exists
    if(foundUser[0]){
        return res.status(409).send('Sorry, email is already taken');
    }
    // create a salt and hash for the password
    const passwordSalt = bcrypt.genSaltSync(15);
    const passwordHash = bcrypt.hashSync(password, passwordSalt);
    // register this user now
    const newUser = await db.register_user([email, passwordHash, first_name, last_name]);
    // salt and hash the pin  number
    const pinSalt = bcrypt.genSaltSync(15);
    const pinHash = bcrypt.hashSync(pin, pinSalt);
    // create an account for the new user
    const newUserAccount = await db.create_new_account([newUser[0].id, pinHash]);
    // remove password from newUser
    delete newUser[0].password;
    // store user info on the session
    req.session.user = newUser[0];
    // new object for account balances
    const accountBalances = {...newUserAccount[0], user_id: newUser[0].id};
    // send a response
    res.status(200).send(accountBalances);
};

const login = async (req, res) => {
    // body info 
    const {email, password, pin} = req.body;
    // db instance
    const db = req.app.get('db');
    // find user with email
    const foundUser = await db.find_user([email]);
    // check to see length of users
    if(!foundUser[0]){
        return res.status(403).send('Invalid credentials, please try again!')
    }
    // see if user is authed
    const authedPassword = bcrypt.compareSync(password, foundUser[0].password);
    // get user account
    const userAccount = await db.get_user_account([foundUser[0].id]);
    // check to see if pin is correct
    const authPin = bcrypt.compareSync(pin, userAccount[0].pin);
    // check to see if authed
    if(authedPassword && authPin){
        // remove pass
        delete foundUser[0].password;
        // store user onto session
        req.session.user = foundUser[0];
        // create account obj
        const accountInfo = {
            savings: userAccount[0].savings,
            checking: userAccount[0].checking,
            user_id: foundUser[0].id
        };
        // send user account info back
        res.status(200).send(accountInfo);
    } else {
        // send error message
        res.status(401).send('Invalid Pin or Password!');
    }
};

const logout = (req, res) => {

};

module.exports = {
    register,
    login,
    logout
};