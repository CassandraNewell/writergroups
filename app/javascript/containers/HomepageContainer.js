import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import MyGroupsContainer from './MyGroupsContainer'
import SignInTile from '../components/SignInTile'


class HomepageContainer extends Component {
  constructor(props){
    super(props)
    // current_user has dummy value to distinguish first render from no-current_user render (see render block)
    this.state = {
      groups: [],
      current_user: "first_render_user",
      errors: []
    }
    this.onNewGroupSubmit = this.onNewGroupSubmit.bind(this)
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
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onNewGroupSubmit(payload) {
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
        errors: body.errors
      } else {
        this.setState({
          groups: body.groups
        })
      }
    })
    .catch(error => console.error(`Error in new group POST fetch: ${error.message}`));
  }

  render() {
    let current_user = this.state.current_user

    // Display empty page upon first render to avoid flashing dark background on first render when user is signed in
    let returnPage
    if (current_user === "first_render_user") {
      returnPage = <div></div>
    } else if (current_user === null) {
      returnPage = <SignInTile />
    } else {
      returnPage =
      <MyGroupsContainer
        groups= {this.state.groups}
        onNewGroupSubmit = {this.onNewGroupSubmit}
      />
    }

    return(
      <div>
        {returnPage}
      </div>
    )
  }
}

export default HomepageContainer
