import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import NewGroupContainer from '../containers/NewGroupContainer'
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
    let my_groups = this.state.groups.map(group => {
      return(
        <MyGroupTile
          key={group.id}
          group={group}
        />
      )
    })

    if (this.state.current_user === null) {
      return <SignInTile />
    } else {
      return(
        <div>
          <div className="grid-x grid-padding-x grid-padding-y">
            <div className="cell small-4 small-offset-4">
              <h1> My Groups </h1>
            </div>
            <div className="cell small-3 small-offset-9">
              <button className="button large expand">
                <Link to="/groups" style={{color: 'white'}}>Find a group</Link>
              </button>
            </div>
          </div>
          <div className="grid-x">
            <div className="cell small-10 medium-8 small-offset-1 medium-offset-2">
              <div className="grid-y grid-margin-y grid-padding-x">
                {my_groups}
              </div>
            </div>
            <div className="cell small-10 medium-8 small-offset-1 medium-offset-2">
              <NewGroupContainer
                onNewGroupSubmit = {this.onNewGroupSubmit}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default HomepageContainer
