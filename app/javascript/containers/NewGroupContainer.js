import React, { Component } from 'react'
import {Link} from 'react-router'

import InputTile from '../components/InputTile'

class NewGroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.groupFetch(
      '/api/v1/groups',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"}
      }
    )
    this.setState({
      name: "",
      description: ""
    })
  }

  render() {
    return(
      <div className="text-center">

        <button className="button large expand">
          <Link to="/groups" style={{color: 'white'}}>
            Find a group
          </Link>
        </button>

        <hr/>

        <div className="new-group grid-x grid-padding-x">
          <div className="cell">
            <h4> Create a New Group </h4>
          </div>

          <form className="cell" onSubmit={this.onSubmit}>
              <label>Name
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </label>
              <label>Description
                <textarea
                  name="description"
                  value={this.state.description}
                  rows="4"
                  onChange={this.onChange}
                />
              </label>
            <div className="">
              <input type="submit" className="button expanded"/>
            </div>
          </form>

        </div>
      </div>
    )
  }
}

export default NewGroupContainer
