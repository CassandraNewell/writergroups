import React, { Component } from 'react'

const SignInTile = (props) => {
  return(
    <div className="hero-full-screen grid-x grid-x-padding">
      <div className="middle-content-section cell small-6 small-offset-3 grid-y grid-padding-y">
        <div className="cell small-4">
          <h1> Welcome! </h1>
        </div>
        <div className="cell small-4">
          <p> WriterGroups helps writers form writing groups. Find a group -- or create your own -- and then chat with your group, schedule meetups, share book recs, and more! </p>
        </div>
        <div className="cell small-4 grid-x">
          <div className="cell small-4 small-offset-1">
            <a className="button expanded" href="/users/sign_in"> Sign In </a>
          </div>
          <div className="cell small-4 small-offset-2">
            <a className="button expanded secondary" href="/users/sign_up"> Sign Up </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInTile
