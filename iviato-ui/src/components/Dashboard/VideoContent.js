import React, { Component } from 'react';
import './VideoContent.css';
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../img/iviato.png';
import { Player } from 'video-react';
const path = require('path');


/**
 * The VideoContent class encapsulates the dashboard's media player and relevant
 * video information such as title and description.
 * @extends Component
 */
class VideoContent extends Component {
  constructor(props){
    super(props);
    var moviePath = path.resolve("../../img/nick.mov")
    console.log(moviePath);
  }


  render() {
    return (
      <div className="videocontent">
        <Player
          playsInline
          poster={require("../../img/background.jpg")}
          src={require("../../img/nick.mov")}
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
