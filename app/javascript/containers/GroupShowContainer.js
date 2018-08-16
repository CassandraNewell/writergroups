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
      manuscripts: []
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
        messages: body.messages,
        manuscripts: body.manuscripts
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
    console.log("POST payload")
    console.log(payload)

    fetch(`/api/v1/manuscripts`, {
      method: 'POST',
      body: payload,
      credentials: "same-origin",
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
      this.setState({
        manuscripts: this.state.manuscripts.concat(body.manuscript)
      })
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
              group_id={this.state.group.id}
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
