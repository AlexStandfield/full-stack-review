// Initial State
const initialState = {
    account: {}
};

// Action Types
const ADD_ACCOUNT = 'ADD_ACCOUNT';

// Action Builders (dispatchers)
export function addAccount(account){
    return {
        type: ADD_ACCOUNT,
        payload: account
    }
};

// Reducer Function
export default function reducer(state = initialState, action){
    switch(action.type){
        case ADD_ACCOUNT:
            return Object.assign({}, state, {account: action.payload});
        default:
            return state;
    }
};