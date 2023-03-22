import React, { Component } from 'react';
import { getPublicApiService } from 'jet-admin-sdk';
import './App.css';
import ExternalLinksComponent from './ExternalLinks';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  getPublicApiService().projectsStore.setCurrent('test_4394');
  getPublicApiService().authService.tokenLogin('f0639528570331bf76ae75390fa93aca9ff1a906');

}

class App extends Component {

  render() {
    return (
      <div className="container">
        <ExternalLinksComponent api_token={this.props.api_token} api_url={this.props.api_url} />
      </div>
    );
  }
}

export default App;
