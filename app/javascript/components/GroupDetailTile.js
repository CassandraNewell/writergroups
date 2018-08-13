import React, { Component } from 'react'
const GroupDetailTile = props => {

  let members
  if (props.members) {
    members= props.members.map(member => {
      return(
        <li key={member.id}> {member.fullname} </li>
      )
    })
  } else {
    members = <p> No members yet! </p>
  }

  return (
    <div>
      <p> Description: {props.description} </p>
      <p> Owner: {props.owner_fullname}</p>
      <h4> Members: </h4>
      <ul>
        {members}
      </ul>
    </div>
  )
}

export default GroupDetailTile
