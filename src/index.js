import './index.css';

import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import logo from './covibot.jpg';
import * as serviceWorker from './serviceWorker';

const styleOptions = {
  bubbleBackground: 'lightblue',
  bubbleFromUserBackground: 'lightgreen',
  botAvatarInitials: 'CV',
  botAvatarImage: logo,
  hideUploadButton: true,
};

const store = createStore({}, ({ dispatch }) => next => action => {
  if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
    dispatch({
      type: 'WEB_CHAT/SEND_EVENT',
      payload: {
        name: 'webchat/join',
        value: { language: window.navigator.language }
      }
    });
  }

  return next(action);
});

fetch('https://covionestopbot.azurewebsites.net/api/environment').then((response) => {
  return response.json();
}).then((data) => {
  window.secret = data.directLineSecret
  ReactDOM.render(
    <React.StrictMode>
      <App />
      <ReactWebChat directLine={createDirectLine({
        token: data.directLineSecret
      })} store={store} styleOptions={styleOptions} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
