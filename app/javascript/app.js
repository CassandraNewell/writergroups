import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import UserShowContainer from 'containers/UserShowContainer'
import HomepageContainer from 'containers/HomepageContainer'
import GroupsIndexContainer from 'containers/GroupsIndexContainer'

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
          <IndexRoute component={HomepageContainer} />
          <Route path='/groups' component={GroupsIndexContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
