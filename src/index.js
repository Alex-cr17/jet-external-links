import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

class JetTestReact extends HTMLElement {
  static get observedAttributes() {
    return ['api_url', 'api_token', 'column_title', 'column_icon', 'column_link'];
  }

  createElement(params) {
    return React.createElement(App, { ...params, dispatchEvent: this.dispatchEvent.bind(this) }, React.createElement('slot'));
  }

  connectedCallback() {
    const api_url = this.getAttribute('api_url');
    const api_token = this.getAttribute('api_token');
    const column_title = this.getAttribute('column_title');
    const column_icon = this.getAttribute('column_icon');
    const column_link = this.getAttribute('column_link');
    ReactDOM.render(this.createElement({api_url, api_token, column_title, column_icon, column_link}), this);

  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

customElements.define('jet-external-links', JetTestReact);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
