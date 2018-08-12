import React, { Component } from 'react'
import ChatTile from "../components/ChatTile"

class GroupShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      name: "",
      description: "",
      messages: []
    }
    this.onMessageSubmit = this.onMessageSubmit.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/groups/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        name: body.group.name,
        description: body.group.description,
        messages: body.messages
      })
    })
    .catch(error => console.error(`Error in group show fetch: \n${error.message}`));

    App.ChatChannel = App.cable.subscriptions.create(
     {
       channel: "ChatChannel",
       id: this.props.params.id
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

  onMessageSubmit(payload) {
    console.log('Submit payload')
    console.log(payload)
    App.ChatChannel.send({
      message: payload,
      group_id: this.state.id
    })
  }

  render() {
    console.log("Messages in GroupShowContainer")
    console.log(this.state.messages)
    return(
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <h1> Chat </h1>
        <ChatTile
          id={this.state.id}
          messages={this.state.messages}
          onSubmit = {this.onMessageSubmit}
        />
      </div>
    )
  }
}

export default GroupShowContainer
