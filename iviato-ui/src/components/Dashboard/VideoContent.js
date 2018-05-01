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

    this.state = {
      videoSrc: '/Users/hirad/Dev/i-viato/iviato-storage/out-nick.mov'
    };

    console.log(this.state.videoSrc);
  }

  setSource(src) {
    this.setState({videoSrc: src })
  }


  render() {
    return (
      <div className="videocontent">
        <Player
          playsInline
          // poster={require("../../img/background.jpg")}
          // src={require("../../img/nick.mov")}
          poster="/img/background.jpg"
          src="/Users/hirad/Dev/i-viato/iviato-storage/out-nick.mov.mp4"
        />
        <div className="info">
          <h2 className="title">Video Title</h2>
          <p className="description">Video description, frame rate, resolution, all the good stuff</p>
        </div>
      </div>
    );
  }
}

export default VideoContent;
