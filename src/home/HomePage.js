import React, { Component } from 'react';
import Home from '../components/Home';
import Landing from '../components/Landing';
import auth from '../services/auth/initAuth';

export class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  render() {
    return (
      <>
        {
          auth.isLoggedIn()
          ? <Home/>
          : <Landing/>
        }
      </>
    );
  }
}

export default HomePage;