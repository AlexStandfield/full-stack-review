import React, { Component } from 'react'

// Router
import router from './utils/router';

// Style Sheet
import 'reset-css';

export default class App extends Component {
  render() {
    return (
      <div>
        {router}
      </div>
    )
  }
};