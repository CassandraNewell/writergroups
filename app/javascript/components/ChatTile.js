import React, { Component } from 'react'

class ChatTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.message)
    this.setState({ message: '' })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  render() {
    let messages = this.props.messages.map((message, index) => {
      return(
        <div className="cell small-10 small-offset-1 grid-x" key={index}>
          <p className="cell small-3"> {message.commenter_name}:</p>
          <p className="cell small-6"> {message.body} </p>
          <p className="cell small-3"> {message.created_at_time} {message.created_at_date} </p>
        </div>
      )
    })
    return(
      <div>
        <div className="grid-x">
          {messages}
        </div>

        <div className="grid-x">
          <form className="cell small-10 small-offset-1" onSubmit={this.onSubmit}>
            <input type="text" name="message" placeholder="Your message here!" value={this.state.message} onChange={this.onMessageChange} />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatTile
