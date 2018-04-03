import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Help from 'material-ui/svg-icons/action/help-outline';
import ExitApp from 'material-ui/svg-icons/action/exit-to-app';
import Upload from 'material-ui/svg-icons/file/file-upload';
import VideoContent from './VideoContent';
import Uploads from './Uploads';
import './MainDashboard.css';
import logo from '../../img/iviato.png';
class MainDashboard extends Component {
  constructor(props){
    super(props);
  }

  handleClick(event){

  }

  render() {
    return (
      <div className="maindashboard">
        <AppBar
          title={<img src={logo} className="app-logo" alt="logo" />}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Upload" leftIcon={<Upload/>} />
              <MenuItem primaryText="Help" leftIcon={<Help/>}/>
              <MenuItem primaryText="Sign out" leftIcon={<ExitApp/>} />
            </IconMenu>
          }
          showMenuIconButton={false}
          style={{
            backgroundColor: '#4AA9F4',
          }}
        />
        <div className="content-div">
          <div className="video-div">
            <VideoContent />
          </div>
          <div className="uploads-div">
            <h6 className="uploads-title">Uploads</h6>
            <div className="video-list">
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
              <Uploads />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainDashboard;
