import React, { Component } from 'react'

class ChatTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      new_message: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }

  componentDidMount() {
    App.ChatChannel = App.cable.subscriptions.create(
      {
        channel: "ChatChannel",
        Chat_id: this.props.id,
      },
      {
        connected: () => console.log("ChatChannel connected"),
        disconnected: () => console.log("ChatChannel disconnected"),
        received: data => {
          this.setState({
            messages: this.state.messages.concat(data.message)
          })
        }
      }
    );
  }

  onSubmit(event) {
    event.preventDefault()
    App.ChatChannel.send({
      message: this.state.new_message
    })
    this.setState({ new_message: '' })
  }

  onMessageChange(event) {
    this.setState({ new_message: event.target.value })
  }

  render() {
    let messages = this.state.messages.map((message, index) => {
      return(
        <p className="cell small-10 small-offset-1" key={index}> {message} </p>
      )
    })
    return(
      <div>
        <div className="grid-x">
          {messages}
        </div>
        <div className="grid-x">
          <form className="cell small-10 small-offset-1" onSubmit={this.onSubmit}>
            <input type="text" name="new_message" placeholder="Your message here!" value={this.state.new_message} onChange={this.onMessageChange} />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatTile
