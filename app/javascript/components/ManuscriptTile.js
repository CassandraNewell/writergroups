import React, { Component } from 'react'


const ManuscriptTile = (props) => {

  let manuscriptSummaries = props.manuscripts.map(manuscript => {
    return(
      <p> I'm a manuscript that was uploaded </p>
    )
  })

  return(
    <div className="group-tile">
      <button onClick={props.onManuscriptSubmit}>
        Upload a manuscript
      </button>
      <h1> Manuscripts </h1>
      <ul>
        {manuscriptSummaries}
      </ul>
    </div>
  )

}

export default ManuscriptTile
