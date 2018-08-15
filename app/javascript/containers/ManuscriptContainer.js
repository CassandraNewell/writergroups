import React, { Component } from 'react'
import Dropzone from 'react-dropzone';


class ManuscriptContainer extends Component {
  constructor(props) {
  super(props);
  this.state = {
    name: '',
    description: '',
    file: []
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
      this.setState({ file: file })
    } else {
      this.setState({ message: 'You can only upload one photo per board game.'})
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log(this.state)

    let body = new FormData()
    body.append("title", this.state.title)
    body.append("description", this.state.description)
    body.append("file", this.state.file[0])

    this.props.onManuscriptSubmit(this.state)
  }

  render() {
    let manuscriptSummaries = this.props.manuscripts.map(manuscript => {
      return(
        <div key={manuscript.id}>
          <a href="www.fatcatart.com">
            <b>{manuscript.title} </b>
          </a>
          by <b>{manuscript.user.fullname}</b>
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
            <div className="small-8">
              <p>{this.state.message}</p>
              <label>Name
                <input type='title' name='name' value={this.state.name} onChange={this.handleChange} />
              </label>

              <label>Description
                <textarea name='description' value={this.state.description} onChange={this.handleChange} rows="6"/>
              </label>
            </div>

            <div className="small-4">
              <section>
                <div className="dropzone">
                  <Dropzone onDrop={this.onDrop}>
                    <p>Try dropping a file here, or click to select a file to upload.</p>
                  </Dropzone>
                </div>
                <aside>
                  <h6>Dropped files</h6>
                  <ul>
                    <li key={this.state.file.name}>None yet!</li>
                  </ul>
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
