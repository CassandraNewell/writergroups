import React, { Component } from 'react'

const SignInTile = (props) => {
  return(
    <div>
      <h1> Welcome! </h1>
      <p> WriterGroups does X, Y, Z </p>
        <p> To use WriterGroups, please <a href="/users/sign_in">sign in </a> or <a href="/users/sign_up">sign up</a>!</p>
    </div>
  )
}

export default SignInTile
