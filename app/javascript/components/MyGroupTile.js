import React, { Component } from 'react'

const GroupTile = (props) => {
  return(
    <div className="cell group-tile">
      <h3> {props.group.name} ({props.group.id})</h3>
      <p> {props.group.description} </p>
    </div>
  )
}

export default GroupTile
