import React, { Component } from 'react'

const GroupTile = (props) => {



  return(
    <div className="cell group-tile grid-x">
      <div className="cell small-10">
        <h3> {props.group.name} ({props.group.id}) </h3>
        <p> {props.group.description}</p>
      </div>
      <div className="cell small-2">
        <button className="button" data-id={props.group.id} onClick={props.joinClick}>Join Group</button>
      </div>
    </div>
  )
}

export default GroupTile
