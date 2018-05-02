import React, { Component, Video } from 'react';
import './VideoContent.css';
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../img/iviato.png';
import { Player } from 'video-react';
import ReactVideo from 'react.video';

const path = require('path');

/**
 * The VideoContent class encapsulates the dashboard's media player and relevant
 * video information such as title and description.
 * @extends Component
 */
class VideoContent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="videocontent">
        <Player
          playsInline
          poster={this.props.preview}
          src={this.props.video}
        />
        <div className="info">
          <h2 className="title">{this.props.video_title}</h2>
          <p className="description">{this.props.video_info}</p>
        </div>
      </div>
    );
  }
}

export default VideoContent;
