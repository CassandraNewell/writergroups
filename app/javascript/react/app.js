import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/'>

        </Route>
      </Router>
    )
  }
}

export default App;
