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
              <h1> My Groups </h1>
            </div>
          </div>

          <div className="grid-x grid-padding-x">
            <div className="cell small-9">
              <div className="grid-x grid-margin-x grid-margin-y small-up-1 medium-up-2">
                {my_groups}
              </div>
            </div>

            <div className="cell small-3">
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

export default MyGroupsContainer
