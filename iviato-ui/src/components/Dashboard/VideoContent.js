import React, { Component } from 'react';
import './VideoContent.css';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

/**
 * The VideoContent class encapsulates the dashboard's media player and relevant
 * video information such as title and description.
 * @extends Component
 */
class VideoContent extends Component {
  constructor(props){
    super(props);
  }

  description() {
    if (this.props.video) {
      if (this.props.video.description) {
        return this.props.video.description;
      }
      const resolution = `${this.props.video.width}x${this.props.video.height}`;
      const fps = this.props.video.fps;
      const frames = this.props.video.frames;
      const duration = Math.round(this.props.video.frames/this.props.video.fps);
      return `Duration: ${duration} seconds | Resolution: ${resolution} | FPS: ${fps} | Total # of Frames: ${frames}`;
    } 
    return 'Please upload or select a video';
  } 

  render() {
    return (
      <div className="videocontent">
        <Player>
          <source src={this.props.video ? this.props.video.url : ''} />
        </Player>
        <div className="info">
          <h2 className="title">{this.props.video ? this.props.video.filename : ''}</h2>
          <p className="description">{this.description()}</p>
        </div>
      </div>
    );
  }
}

export default VideoContent;
