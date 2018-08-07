import React, { Component } from 'react'
import {Link} from 'react-router'
import GroupTile from '../components/GroupTile'


class HomepageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      groups: []
    }
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
          groups: body
        })
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  render() {
    let sign_in_warning
    let my_groups = this.state.groups.map(group => {
      return(
        <GroupTile
          key={group.id}
          group={group}
        />
      )
    })


    return(
      <div>
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell small-6">
            <h1> My Groups </h1>
          </div>
          <div className="cell small-3 small-offset-3">
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
          </div>
        </div>
      </div>
    )
  }
}

export default HomepageContainer
