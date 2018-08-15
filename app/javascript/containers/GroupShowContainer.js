import React, { Component } from 'react'
import ChatTile from "../components/ChatTile"
import GroupDetailTile from "../components/GroupDetailTile"
import ManuscriptContainer from "./ManuscriptContainer"

class GroupShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      messages: [],
      group: {},
      members: [],
      manuscripts: [
        {
          id: 1,
          title: "Super rough draft",
          description: "This is a really rough draft of that thing I was talking about",
          user: {
            fullname: "John Smith"
          }
        },
        {
          id: 2,
          title: "One is the loneliest number",
          description: "A short story. Would particularly appreciate feedback about pacing! Thanks all.",
          user: {
            fullname: "Sarah Johnson"
          }
        }
      ]
    }
    this.onMessageSubmit = this.onMessageSubmit.bind(this)
    this.onManuscriptSubmit = this.onManuscriptSubmit.bind(this)
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
    App.ChatChannel.send({
      message: payload,
      group_id: this.state.id
    })
  }

  onManuscriptSubmit(payload) {
    console.log("hi")
    fetch('/groups', {
      method: 'POST',
      body: payload
    })
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
      console.log("hi again")
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div>
        <div className="text-center">
          <h1>{this.state.group.name}</h1>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-6 group-tile">
            <GroupDetailTile
              description={this.state.group.description}
              owner_fullname={this.state.group.owner_fullname}
              owner_id={this.state.group.owner_id}
              members={this.state.members}
            />
            <ManuscriptContainer
              manuscripts={this.state.manuscripts}
              onManuscriptSubmit={this.onManuscriptSubmit}
            />
          </div>
          <div className="cell small-6 chat-container">
            <h4 className="text-center"> Chat </h4>
            <ChatTile
              id={this.state.group.id}
              messages={this.state.messages}
              onMessageSubmit = {this.onMessageSubmit}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default GroupShowContainer
