import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import UserShowContainer from 'containers/UserShowContainer'

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
          <IndexRoute component={UserShowContainer} />

        </Route>
      </Router>
    )
  }
}

export default App;
