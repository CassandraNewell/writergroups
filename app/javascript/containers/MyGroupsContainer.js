import React, { Component } from 'react'
import {Link} from 'react-router'
import MyGroupTile from '../components/MyGroupTile'
import NewGroupContainer from '../containers/NewGroupContainer'


class MyGroupsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    let my_groups = this.props.groups.map(group => {
      return(
        <MyGroupTile
          key={group.id}
          group={group}
        />
      )
    })

    return(
      <div>
        <div>

          <div>
            <div className="text-center">
              <br/>
              <h1> My Groups </h1>
              <br/>
              <br/>
            </div>
          </div>

          <div className="grid-x grid-padding-x">
            <div className="cell small-8">
              <div className="grid-y grid-margin-y">
                {my_groups}
              </div>
            </div>

            <div className="cell small-4">
              <NewGroupContainer
                postNewGroup = {this.props.postNewGroup}
                />
            </div>
          </div>

        </div>
      </div>
    )
  }

}

export default MyGroupsContainer
