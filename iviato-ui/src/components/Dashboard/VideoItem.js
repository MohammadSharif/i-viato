import React, { Component } from 'react';
import './VideoItem.css';
import background from '../../img/background.jpg';

/**
 * The Uploads class encapsulates the list item for the uploads feed.
 * It contains a video preview image, a title, and the duration of the video,
 * as well as a query reference to load the video on click
 * @extends Component
 */
class VideoItem extends Component {
  constructor(props){
    super(props);
  }

  onComponentClick = () => {
    this.props.onItemClick(this.props.video);
  }

  render() {
    return (
      <div className="feedcontent" onClick={this.onComponentClick}>
        <img src={this.props.video.imageurl} className="preview" />
        <div className="info">
          <h6 className="video-title">{this.props.video.filename}</h6>
          <p className="duration">{this.props.video.description ? this.props.video.description : Math.round(this.props.video.frames/this.props.video.fps)}</p>
        </div>
      </div>
    );
  }
}

export default VideoItem;
