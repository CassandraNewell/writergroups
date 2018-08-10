import React, { Component } from 'react'

class GroupShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: "",
      description: ""
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
          id: body.group.id,
          name: body.group.name,
          description: body.group.description
        })
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render() {
    return(
      <div>
        <h1>{this.state.name}</h1>
      </div>
    )
  }
}

export default GroupShowContainer
