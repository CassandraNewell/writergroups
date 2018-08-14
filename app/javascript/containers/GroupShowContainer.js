import React, { Component } from 'react'
import ChatTile from "../components/ChatTile"
import GroupDetailTile from "../components/GroupDetailTile"

class GroupShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      messages: [],
      group: {},
      members: []
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
        group: body.group,
        members: body.members,
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
    return(
      <div>
        <div className="text-center">
          <h1>{this.state.group.name}</h1>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            <GroupDetailTile
              description={this.state.group.description}
              owner_fullname={this.state.group.owner_fullname}
              owner_id={this.state.group.owner_id}
              members={this.state.members}
              />
          </div>
          <div className="cell small-6 chat-container">
            <h4 className="text-center"> Chat </h4>
            <ChatTile
              id={this.state.group.id}
              messages={this.state.messages}
              onSubmit = {this.onMessageSubmit}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default GroupShowContainer
