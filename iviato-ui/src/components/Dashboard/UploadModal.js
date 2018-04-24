import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Upload from 'material-ui/svg-icons/av/video-call';
import RaisedButton from 'material-ui/RaisedButton';

import './UploadModal.css';

/**
 * The UploadModal class contains all necessary functionality and components
 * for an effective modal to upload videos through.
 * @extends Component
 */
class UploadModal extends Component {
  constructor(props){
    super(props);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);

    this.state = {
      button: "Select Video",
      header: "Accepted file types: .mov, .mp4",
      uploadStyle: "None"
    }
  }
  /**
   * The handleSelectClick function activates the input file selection menu.
   * @param  {[type]} event button click
   * @return {[type]}       window toggle
   */
  handleSelectClick(event){
    this.upload.click()
  }

  /**
   * The handleUploadClick function is responsible for taking the file that was
   * chosen and uploading it to our pipeline and database.
   * @param  {[type]} event button click
   * @return {[type]}       void
   */
  handleUploadClick(event){
    alert("UPLOAD")
  }

 /**
  * The handleFiles function is responsible for updating the state with relevant
  * file information after a file is chosen. We extract the filename from the
  * full path so that it can be displayed as the selected file.
  * @return {[type]} void
  */
  handleFiles(){
    var file = document.getElementById('upload')
    var fileName = file.value.split(/(\\|\/)/g).pop();
    this.setState({button: "Select Another", header: fileName, uploadStyle: "inline-block"})
    console.log(file.files[0])
  }

  render() {
    return (
      <div id="myModal" class={`modal-${this.props.toggled}`}>
        <div class="modal-content">
          <input
            type="file"
            id="upload"
            ref={(ref) => this.upload = ref}
            onChange={this.handleFiles}
            className="file-input"
            accept=".png" />
          <h3 className="upload-header">{this.state.header}</h3>
          <RaisedButton
            className="buttons"
            label={this.state.button}
            backgroundColor='#4AA9F4'
            labelColor='#FFFFFF'
            style={{width: "80%"}}
            onClick={this.handleSelectClick}
            />
          <RaisedButton
            className="buttons"
            label="Upload"
            backgroundColor='#81C784'
            labelColor='#FFFFFF'
            style={{width: "80%", display: this.state.uploadStyle}}
            onClick={this.handleUploadClick}
            />
          <RaisedButton
            className="buttons"
            label="Cancel"
            backgroundColor='#9ca8bc'
            labelColor='#FFFFFF'
            style={{width: "80%"}}
            onClick={() => this.props.onClick()}/>
        </div>
      </div>
    );
  }
}

export default UploadModal;
