import './App.css';

import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import React, { useMemo } from 'react';

// import logo from './logo.svg';

function App() {
  const directLine = useMemo(() => createDirectLine({ token: window.secret }), []);
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

  return <ReactWebChat directLine={directLine} store={store} />;
}

export default App;
