import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';

// Action Builders
import {addAccount} from '../../redux/reducer';

// Style Sheet
import './home.css';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            display: true,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            pin: '',
            error: false,
            errorMessage: ''
        };
    };

    changeDisplay = () => {
        this.setState({
            display: !this.state.display,
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            pin: '',
            error: false,
            errorMessage: ''
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    login = () => {
        const {email, password, pin} = this.state;
        axios.post('/auth/login', {email, password, pin})
            .then(response => {
                // add account info to redux
                this.props.addAccount(response.data)
                // redirect
                if(this.state.error !== true){
                    this.props.history.push('/dashboard');
                }
            })
            .catch(errorObj => {
                this.setState({
                    error: true,
                    errorMessage: errorObj.response.data
                })

                setTimeout(() => {
                    this.setState({
                        error: false,
                        errorMessage: ''
                    })
                }, 3000);
            });
    };

    register = () => {
        const {email, password, pin, first_name, last_name} = this.state;
        axios.post('/auth/register', {email, password, pin, first_name, last_name})
            .then(response => {
                // add account info to redux
                this.props.addAccount(response.data)
                // redirect
                if(this.state.error !== true){
                    this.props.history.push('/dashboard');
                }
            })
            .catch(errorObj => {
                this.setState({
                    error: true,
                    errorMessage: errorObj.response.data
                })

                setTimeout(() => {
                    this.setState({
                        error: false,
                        errorMessage: ''
                    })
                }, 3000);
            });
    }

    render() {
        console.log(this.props)
        return (
            <div className="home-container">
                {
                    this.state.error ?
                    (
                        <div className="error">
                            {this.state.errorMessage}
                        </div>
                    )
                    :
                    null
                }

                {
                    this.state.display ?
                    (<div className={
                        this.state.error ?
                        "login-container shake"
                        :
                        "login-container"
                    }>
                        <input type="email" 
                            placeholder="email" 
                            className="login-input" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleChange}/>
                        <input type="password" 
                            placeholder="password" 
                            className="login-input" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange}/>
                        <input type="password" 
                            placeholder="pin" 
                            className="login-input" 
                            name="pin"
                            value={this.state.pin}
                            onChange={this.handleChange} />
                        <button className="btn login" onClick={this.login}>Login</button>
                        <button className="btn register" onClick={this.changeDisplay}>Register</button>
                    </div>)
                    :
                    (<div className="register-container">
                        <input type="text" 
                            placeholder="first name" 
                            className="login-input" 
                            value={this.state.first_name}
                            name="first_name"
                            onChange={this.handleChange}/>
                        <input type="text" 
                            placeholder="last name" 
                            className="login-input" 
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}/>
                        <input type="email" 
                            placeholder="email" 
                            className="login-input" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                        <input type="password" 
                            placeholder="password" 
                            className="login-input" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                        <input type="password" 
                            placeholder="pin" 
                            className="login-input" 
                            name="pin"
                            value={this.state.pin}
                            onChange={this.handleChange}/>
                        <button className="btn login" onClick={this.register}>Sign Up</button>
                        <button className="btn register" onClick={this.changeDisplay}>Cancel</button>
                    </div>)
                }
            </div>
        )
    }
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addAccount})(Home);