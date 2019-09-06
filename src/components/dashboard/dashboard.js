import React, { Component } from 'react'
import {connect} from 'react-redux';

class Dashboard extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Checking Balance: ${this.props.account.checking}</h1>
                <h1>Savings Balance: ${this.props.account.savings}</h1>
            </div>
        )
    }
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Dashboard);