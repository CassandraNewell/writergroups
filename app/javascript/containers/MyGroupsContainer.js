import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import NewGroupContainer from '../containers/NewGroupContainer'

class MyGroupsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [],
      errors: []
    }
    this.groupFetch = this.groupFetch.bind(this)
  }

  componentDidMount(){
    this.groupFetch('/api/v1/groups?scope=memberOf')
  }

  groupFetch(endpoint, headers) {
    fetch(endpoint, headers)
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
    let my_groups = this.state.groups.map(group => {
      return(
        <MyGroupTile key={group.id} group={group} />
      )
    })

    return(
      <div>

        <div className="text-center">
          <br/>
          <h1> My Groups </h1>
          <br/> <br/>
        </div>

        <div className="grid-x grid-padding-x">
          <div className="cell small-8">
            <div className="grid-y grid-margin-y">
              {my_groups}
            </div>
          </div>

          <div className="cell small-4">
            <NewGroupContainer groupFetch = {this.groupFetch} />
          </div>
        </div>

      </div>
    )
  }

}

export default MyGroupsContainer
