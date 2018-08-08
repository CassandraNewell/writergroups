import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import NewGroupContainer from '../containers/NewGroupContainer'


class HomepageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [],
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
          groups: body.groups
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
      debugger
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
    let sign_in_warning
    let my_groups = this.state.groups.map(group => {
      return(
        <MyGroupTile
          key={group.id}
          group={group}
        />
      )
    })


    return(
      <div>
        <div className="grid-x">
          <div className="cell small-4">
            <h2> My Groups </h2>
          </div>
          <div className="cell small-3 small-offset-9">
            <button className="button">
              <Link to="/groups" style={{color: 'white'}}>Find a group</Link>
            </button>
          </div>
        </div>
        {sign_in_warning}
        <div className="grid-x">
          <div className="cell small-10 medium-8 small-offset-1 medium-offset-2">
            <div className="grid-y grid-margin-y grid-padding-x">
              {my_groups}
            </div>
            <div>
              <NewGroupContainer
                onNewGroupSubmit = {this.onNewGroupSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomepageContainer
