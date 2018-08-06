import React, { Component } from 'react'
import GroupTile from '../components/GroupTile'

class GroupsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/groups')
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

  render(){
    let groups
    let no_group_message = "Couldn't find any groups looking for members -- why not create one yourself?"
    if (this.state.groups === []) {
      groups = <p> {no_group_message} </p>
    } else {
      groups = this.state.groups.map(group => {
        return(
          <GroupTile
          key={group.id}
          group={group}
          />
        )
      })
    }

    return(
      <div>
        <h1> Writer Groups </h1>
        {groups}
      </div>
    )
  }
}

export default GroupsIndexContainer
