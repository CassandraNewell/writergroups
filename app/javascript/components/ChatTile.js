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
    this.props.onMessageSubmit(this.state.message)
    this.setState({ message: '' })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  render() {

    let messages = this.props.messages.map((message, index) => {
      return(
        <div className="cell grid-x" key={index}>
          <p className="cell small-3"> {message.commenter_name}:</p>
          <p className="cell small-7"> {message.body} </p>
          <p className="cell small-2"> {message.created_at_time}<br/>{message.created_at_date} </p>
        </div>
      )
    })

    return(
      <div>
        <div className="grid-x">
          {messages}
        </div>

        <div>
          <form className="grid-x grid-margin-x" onSubmit={this.onSubmit}>
            <input
              className="cell small-9"
              type="text"
              name="message"
              placeholder="Your message here!"
              value={this.state.message}
              onChange={this.onMessageChange}
            />
          <input className="cell small-3 button" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatTile
