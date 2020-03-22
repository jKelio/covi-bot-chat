import './App.css';

import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import React, { useMemo } from 'react';

import logo from './covibot.jpg';
import hackathon from './wirvsvirus.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: '100%',
  },
  header: {
    textAlign: 'center'
  },
  media: {
    height: 100,
  }
}));

const styleOptions = {
  bubbleBackground: '#5A9BD5',
  bubbleFromUserBackground: '#88efa0',
  botAvatarInitials: 'CV',
  botAvatarImage: logo,
  hideUploadButton: true,
};

function App() {
  const classes = useStyles();
  const directLine = useMemo(() => createDirectLine({
    token: window.secret
  }), []);
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

  return <div className={classes.root}>
    <Grid className={classes.container} container spacing={1}>
      <Grid item xs={12}>
        <Card className={classes.header}>
          <img src={hackathon} alt={'Wir vs. Virus Hackathon'} className={classes.media} />
        </Card>
      </Grid>
      <Grid id={'chat'} item xs={12}>
        <ReactWebChat directLine={directLine} store={store} styleOptions={styleOptions} />
      </Grid>
    </Grid>
  </div>;
}

export default App;
