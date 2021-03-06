import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupsContainer from './MyGroupsContainer'
import MyGroupTile from '../components/MyGroupTile'
import SplashTile from '../components/SplashTile'

class HomepageContainer extends Component {
  constructor(props){
    super(props)

    // current_user has dummy value to distinguish first render
    // from no-current_user render (see render block)
    this.state = {
      current_user: "first_render_user",
      errors: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/users?scope=checkUser')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.errors) {
        this.setState({ errors: body.errors })
      } else {
        this.setState({ current_user: body.current_user })
      }
    })
    .catch(error => console.error(`Fetch error: ${error.message}`));
  }

  render() {
    let current_user = this.state.current_user
    console.log(current_user)

    // Display empty page on first render to avoid flashing dark background as
    // first render before light background in second render
    let returnPage
    if (current_user === "first_render_user") {
      returnPage = <div></div>
    } else if (current_user === null) {
      returnPage = <SplashTile />
    } else {
      returnPage =
        <MyGroupsContainer
          groupFetch = {this.groupFetch}
        />
    }

    return( <div> {returnPage} </div> )
  }
}

export default HomepageContainer
