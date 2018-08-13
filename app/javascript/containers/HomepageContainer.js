import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import MyGroupsContainer from './MyGroupsContainer'
import SignInTile from '../components/SignInTile'


class HomepageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [],
      current_user: null,
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
    console.log(this.state.current_user)
    if (this.state.current_user === null) {
      return <SignInTile />
    } else {
      return (
        <MyGroupsContainer
          groups= {this.state.groups}
          onNewGroupSubmit = {this.onNewGroupSubmit}
        />
      )
    }
  }
}

export default HomepageContainer
