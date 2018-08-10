import React, { Component } from 'react'
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

    this.props.onNewGroupSubmit(payload)
  }

  render() {
    return(
      <div className="cell">
        <h2> Create a New Group </h2>
        <div className="new-group grid-x">
          <form className="cell small-10 small-offset-1"onSubmit={this.onSubmit}>
            <InputTile
              label="Name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
            />
            <InputTile
              label="Description"
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default NewGroupContainer
