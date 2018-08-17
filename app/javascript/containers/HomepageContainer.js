import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupsContainer from './MyGroupsContainer'
import MyGroupTile from '../components/MyGroupTile'
import SplashTile from '../components/SplashTile'

class HomepageContainer extends Component {
  constructor(props){
    super(props)

    // current_user has dummy value to distinguish first render from
    // no-current_user render (see render block)
    this.state = {
      groups: [],
      current_user: "first_render_user",
      errors: []
    }

    this.postNewGroup = this.postNewGroup.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/groups?scope=memberOf')
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
      this.setState({
        groups: body.groups,
        current_user: body.current_user
      })
    })
    .catch(error => console.error(`Fetch error: ${error.message}`));
  }

  postNewGroup(payload) {
    fetch('/api/v1/groups', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    })
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
        this.setState({ groups: body.groups })
      }
    })
    .catch(error => console.error(`Fetch error: ${error.message}`));
  }

  render() {
    let current_user = this.state.current_user

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
          groups= {this.state.groups}
          postNewGroup = {this.postNewGroup}
        />
    }

    return( <div> {returnPage} </div> )
  }
}

export default HomepageContainer
