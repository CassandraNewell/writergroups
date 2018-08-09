import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import SignInTile from '../components/SignInTile'


class HomepageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [],
      current_user: null
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
          groups: body.groups,
          current_user: body.current_user
        })
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
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

    let mainContent
    if (this.state.current_user === null) {
      return <SignInTile />
    } else {
      return(
        <div>
          <div className="grid-x">
            <div className="cell small-4">
              <h1> My Groups </h1>
            </div>
            <div className="cell small-3 small-offset-9">
              <button className="button">
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
          </div>
        </div>
      )
    }
  }
}

export default HomepageContainer
