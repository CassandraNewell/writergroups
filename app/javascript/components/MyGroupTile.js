import React, { Component } from 'react'
import {Link} from 'react-router'


const GroupTile = (props) => {
  return(
    <div className="cell group-tile">
      <h3>
        <Link to={`/groups/${props.group.id}`}> {props.group.name} </Link>
      </h3>
      <p> {props.group.description} </p>
    </div>
  )
}

export default GroupTile
