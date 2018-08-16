import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

class ManuscriptContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      manuscript_file: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onDrop(file) {
    if(file.length == 1) {
      this.setState({ manuscript_file: file })
    } else {
      this.setState({ message: 'You can only upload one file per manuscript.' })
    }
  }

  onSubmit(event) {
    event.preventDefault()

    let body = new FormData()
    body.append("title", this.state.title)
    body.append("description", this.state.description)
    body.append("manuscript_file", this.state.manuscript_file[0])
    body.append("group_id", this.props.group_id)
    console.log(body)

    this.props.onManuscriptSubmit(body)
  }

  render() {
    let manuscriptSummaries = this.props.manuscripts.map(manuscript => {
      return(
        <div key={manuscript.id}>
          <a href={manuscript.manuscript_file}>
            <b>{manuscript.title} </b>
          </a>
          <p> <i> {manuscript.description}</i> </p>
        </div>
      )
    })

    return(
      <div>
        <div>
          <h1> Manuscripts </h1>
            <ul>
            {manuscriptSummaries}
            </ul>

          <h3> Add a manuscript </h3>
          <form className="grid-x grid-margin-x" onSubmit={this.onSubmit}>
            <div className="small-12 large-8">
              <p>{this.state.message}</p>
              <label>Title
                <input type='title' name='title' value={this.state.title} onChange={this.handleChange} />
              </label>

              <label>Description
                <textarea name='description' value={this.state.description} onChange={this.handleChange} rows="6"/>
              </label>
            </div>

            <div className="small-12 large-4">
              <section>
                <div className="dropzone">
                  <Dropzone onDrop={this.onDrop}>
                    <p>Drop a file here or click to select a file to upload.</p>
                  </Dropzone>
                </div>
                <aside>
                  <h6>Files added</h6>
                  <ul><li> {this.state.manuscript_file.name} </li></ul>
                </aside>
              </section>
            </div>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }

}

export default ManuscriptContainer
