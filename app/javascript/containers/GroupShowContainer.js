import React, { Component } from 'react'
import ChatTile from "../components/ChatTile"

class GroupShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      name: "",
      description: "",
      messages: ["I'm thie first message"]
    }
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
   .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div>
        <h1>{this.state.name}</h1>
        <ChatTile
          id={this.state.id}
          messages={this.state.messages}
        />
      </div>
    )
  }
}

export default GroupShowContainer
