import React, { Component } from 'react'
import FindGroupTile from '../components/FindGroupTile'

class GroupsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
    this.joinClick = this.joinClick.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/groups?scope=notMemberOf')
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
        this.setState({ groups: body })
      })
      .catch(error => console.error(`Error in groups fetch: ${error.message}`));
  }

  joinClick(event){
    fetch(`/api/v1/memberships?group=${event.target.dataset.id}`, {
        method: 'POST'
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
        this.setState({ groups: body.groups })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render(){
    let groups
    let no_group_message = "Couldn't find any groups looking for members -- why not create one yourself?"
    if (this.state.groups === []) {
      groups = <p className="no-groups-found"> {no_group_message} </p>
    } else {
      groups = this.state.groups.map(group => {
        return(
          <FindGroupTile
            key={group.id}
            group={group}
            joinClick={this.joinClick}
          />
        )
      })
    }

    return(
      <div>
        <h1> Find a Writing Group </h1>
        <div className="grid-x">
          <div className="cell small-12 large-8 large-offset-2 ">
            <div className="grid-y grid-margin-y grid-padding-x">
              {groups}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupsIndexContainer
