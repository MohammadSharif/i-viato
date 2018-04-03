import React, { Component } from 'react';
import './Uploads.css';
import background from '../../img/background.jpg';
class Uploads extends Component {
  constructor(props){
    super(props);
  }

  handleClick(event){

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
