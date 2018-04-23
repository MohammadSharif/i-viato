import React, { Component } from 'react';
import './Uploads.css';
import background from '../../img/background.jpg';

/**
 * The Uploads class encapsulates the list item for the uploads feed.
 * It contains a video preview image, a title, and the duration of the video,
 * as well as a query reference to load the video on click
 * @extends Component
 */
class Uploads extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="feedcontent">
        <img src={background} className="preview" />
        <div className="info">
          <h6 className="video-title">Video Title Goes Here</h6>
          <p className="duration">0:10</p>
        </div>
      </div>
    );
  }
}

export default Uploads;
