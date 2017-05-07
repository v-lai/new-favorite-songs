import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { 
  getCurrentUserTracks, 
  checkTrackStatus
} from '../actions/tracks';
import Scatterplot from './Scatterplot';
import AxisSelect from './AxisSelect';
import Navbar from './Navbar';
import './Home.css';

function mapStateToUserProps(state) {
  return {
    username: state.currentUser,
    tracks: state.tracks
  }
}

class Home extends Component {

  constructor(props) {
    super(props)
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentWillMount() {
    if (!checkTrackStatus()) this.props.getCurrentUserTracks();
  }

  isLoggedIn() {
    return (
      localStorage.getItem('reduxPersist:currentUser') ||
      this.props.username
    );
  }

  render() {
    return (
      <div>
        {
          !this.isLoggedIn() ? 
          <Redirect to="/" /> : 
          <div>
            <Navbar />
            <h3>
              Welcome! Here's data on the {this.props.tracks.length} most recently saved 
              track{this.props.tracks.length !== 1 ? 's' : ''} for {this.props.username}.
            </h3>
            <div>
              <AxisSelect axis="x"/>
              <AxisSelect axis="y"/>
            </div>
            <div className="Home-row">
              <div className="col-50">
              </div>
              <div className="col-50">
                <Scatterplot />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToUserProps, { getCurrentUserTracks })(Home);

// add navbar (logout, get DW tracks)
// update svg circles to show album data
// add tooltips
// add radial graph!
// stateless functional components