import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Help from 'material-ui/svg-icons/action/help-outline';
import WhatsHot from 'material-ui/svg-icons/social/whatshot';
import ExitApp from 'material-ui/svg-icons/action/exit-to-app';
import Upload from 'material-ui/svg-icons/file/file-upload';
import VideoContent from './VideoContent';
import VideoItem from './VideoItem';
import UploadModal from './UploadModal';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './MainDashboard.css';
import logo from '../../img/iviato-white.png';
import background from '../../img/background.jpg';

import { isAuthorized, logout } from '../../util/User';
import { changeCurrentVideo, list, getCurrentVideo, getOtherVideos, setCurrentVideo } from '../../util/Video';

/**
 * The MainDashboard class encapsulates all components used for the application's
 * post login dashboard.
 * @extends Component
 */
class MainDashboard extends Component {
  constructor(props){
    super(props);
    this.handleUploadMenuClick = this.handleUploadMenuClick.bind(this);
    this.handleModalComplete = this.handleModalComplete.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.captureVideoFrame = this.captureVideoFrame.bind(this);
    this.handleVideoListClick = this.handleVideoListClick.bind(this);
    this.createUploadsItem = this.createUploadsItem.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.state = {
      modal: false,
      shinobify: false,
      loading: false,
      // The uploads portion of the state should contain the JSON
      // for all of the current users uploaded videos
      // (i.e. preview, title, duration, etc.)
      currentVideo: getCurrentVideo(),
      uploads: getOtherVideos()
    }
  }

  /**
   * The handleUploadMenuClick function displays modal for uploading a file
   * based on the upload menu item being clicked.
   * @param  {[type]} event menu item click
   * @return {[type]}       state change
   */
  handleUploadMenuClick(isShinobi){
    this.setState({modal: true, shinobify: isShinobi})
  }

  /**
   * The handleModalComplete function closes the modal.
   * @param  {[type]} event button click
   * @return {[type]}       state change
   */
  handleModalComplete(event){
    this.setState({modal: false})
  }

  /**
   * The handleLogout function is responsible for signing the user out and
   * returning to the login page.
   * @param  {[type]} event menu item click
   * @return {[type]}       state change
   */
  handleLogout(event) {
    logout();
    this.setState({ redirect: true });
  }

  handleVideoListClick(video){
    changeCurrentVideo(video);
    this.setState({ currentVideo: video, uploads: getOtherVideos() });
  }

  toggleLoading(finished) {
    if (finished) {
      console.log('Refreshing Videos');
      list()
        .then( () => {
          this.setState({
            loading: !this.state.loading,
            currentVideo: getCurrentVideo(),
            uploads: getOtherVideos()
          });
        });
    } else {
      this.setState({
        loading: !this.state.loading,
      });
    }
  }

  createUploadsItem(upload) {
    return <VideoItem
              onItemClick={this.handleVideoListClick}
              video={upload}
              />;
  }

  videoDescription(video) {
    if (video) {
      const resolution = `${video.width}x${video.height}`;
      const fps = video.fps;
      const frames = video.frames;
      const duration = Math.round(video.frames/video.fps);
      return `Duration: ${duration} seconds | Resolution: ${resolution} | FPS: ${fps} | Total # of Frames: ${frames}`;
    } else {
      return 'Please upload or select a video';
    }
  }

  createUploadsList(uploads){
    return uploads.map(this.createUploadsItem);
  }

  captureVideoFrame(video, format, quality) {
      if (typeof video === 'string') {
          video = document.getElementById(video);
      }

      format = format || 'jpeg';
      quality = quality || 0.92;

      if (!video || (format !== 'png' && format !== 'jpeg')) {
          return false;
      }

      var canvas = document.createElement("CANVAS");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext('2d').drawImage(video, 0, 0);

      var dataUri = canvas.toDataURL('image/' + format, quality);
      var data = dataUri.split(',')[1];
      var mimeType = dataUri.split(';')[0].slice(5)

      var bytes = window.atob(data);
      var buf = new ArrayBuffer(bytes.length);
      var arr = new Uint8Array(buf);

      for (var i = 0; i < bytes.length; i++) {
          arr[i] = bytes.charCodeAt(i);
      }

      var blob = new Blob([ arr ], { type: mimeType });
      return { blob: blob, dataUri: dataUri, format: format };
    };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    if (this.state.loading) {
      return (
        <div className={`loading-${this.state.loading}`}>
            <Loader type="Ball-Triangle" color="#4aa9f4" height={80} width={80} />
            <h3>Processing...</h3>
        </div>
      );
    }

    if (isAuthorized().token) {
      return (
        <div className="maindashboard">
          <UploadModal
            toggled={this.state.modal}
            onClick={() => this.handleModalComplete()}
            toggleLoading={this.toggleLoading}
            />
          <input
            type="file"
            id="imgupload"
            ref={(ref) => this.upload = ref}
            className="file-input"
            accept=".png" />
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
                <MenuItem
                  primaryText="Upload"
                  leftIcon={<Upload/>}
                  onClick={() => this.handleUploadMenuClick(false)} />
                <MenuItem
                  primaryText="Shinobify"
                  leftIcon={<WhatsHot/>}
                  onClick={() => this.handleUploadMenuClick(true)}/>
                <MenuItem primaryText="Sign out" leftIcon={<ExitApp/>} onClick={this.handleLogout}/>
              </IconMenu>
            }
            showMenuIconButton={false}
            style={{
              backgroundColor: '#4AA9F4',
            }}
          />
          <div className="content-div">
            <div className="video-div">
              <VideoContent
                // preview={this.captureVideoFrame(this.state.currentVideo, 'png')}
                video={this.state.currentVideo}
                video_title="Sample"
                video_info="Info"
                />
            </div>
            <div className="uploads-div">
              <h6 className="uploads-title">Uploads</h6>
              <div className="video-list">
                {this.createUploadsList(this.state.uploads)}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log('Not Authorized');
      return <Redirect to="/" />;
    }
  }
}

export default MainDashboard;
