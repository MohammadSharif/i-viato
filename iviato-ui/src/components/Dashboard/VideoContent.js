import React, { Component } from 'react';
import './VideoContent.css';
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../img/iviato.png';
import { Player } from 'video-react';

class VideoContent extends Component {
  constructor(props){
    super(props);
  }

  handleClick(event){

  }

  render() {
    return (
      <div className="videocontent">
        <Player
          playsInline
          poster="/img/background.jpg"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
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
