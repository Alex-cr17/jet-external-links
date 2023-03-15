import React, { Component } from 'react';
import { getPublicApiService } from 'jet-admin-sdk';
import './App.css';
import ExternalLinksComponent from './ExternalLinks';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  getPublicApiService().projectsStore.setCurrent('test_4394');
  getPublicApiService().authService.tokenLogin('f0639528570331bf76ae75390fa93aca9ff1a906');
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { app_name, api_token, database_name } = this.props;

    if (app_name && api_token && database_name) {
      fetch(`https://data.jetadmin.io/projects/${app_name}/prod/jet_database_npte/models/${database_name}`, {
        headers: {
          'Authorization': `Bearer ${api_token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ links: data.results, loading: false });
        })
        .catch(error => {
          console.error(error)
          this.setState({ links: [], loading: false });
        });
    }

  }

  render() {
    const { links, loading } = this.state;
    const { column_title, column_icon, column_link } = this.props;
    return (
      <div className="container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ExternalLinksComponent links={links} column_title={column_title} column_icon={column_icon} column_link={column_link} />
        )}
      </div>
    );
  }
}

export default App;
