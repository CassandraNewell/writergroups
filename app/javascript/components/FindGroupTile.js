import React, { Component } from 'react'
import {Link} from 'react-router'

const GroupTile = (props) => {

  return(
    <div className="cell group-tile grid-x">
      <div className="cell small-10">
        <h3>
          <Link to={`/groups/${props.group.id}`}> {props.group.name} </Link>
        </h3>
        <p> {props.group.description}</p>
      </div>
      <div className="cell small-2">
        <button className="button large expand" data-id={props.group.id} onClick={props.joinClick}>Join Group</button>
      </div>
    </div>
  )
}

export default GroupTile
