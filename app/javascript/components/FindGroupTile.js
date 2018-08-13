import React, { Component } from 'react'
import {Link} from 'react-router'

const GroupTile = (props) => {

  return(
    <div className="cell group-tile">
      <div className="">
        <h3>
          <Link to={`/groups/${props.group.id}`}>
            {props.group.name}
          </Link>
        </h3>
        <p> {props.group.description}</p>
      </div>
      <div className="">
        <button className="button" data-id={props.group.id} onClick={props.joinClick}>
          Join
        </button>
      </div>
    </div>
  )
}

export default GroupTile
