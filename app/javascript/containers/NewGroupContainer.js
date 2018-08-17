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
    let payload = {
      name: this.state.name,
      description: this.state.description
    }
    this.props.postNewGroup(payload)
    this.setState({
      name: "",
      description: ""
    })
  }

  render() {
    return(
      <div className="text-center">
        <button className="button large expand">
          <Link to="/groups" style={{color: 'white'}}>Find a group</Link>
        </button>
        <hr/>
        <div className="new-group grid-x grid-padding-x">
          <div className="cell">
            <h4> Create a New Group </h4>
          </div>
          <form className="cell" onSubmit={this.onSubmit}>
            <div className="cell">
              <label>Name
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div className="cell">
              <label>Description
                <textarea
                  name="description"
                  value={this.state.description}
                  rows="4"
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div className="cell">
              <input type="submit" className="button expanded"/>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    )
  }
}

export default NewGroupContainer
