import './App.css';

import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

import hackathon from './wirvsvirus.png';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  header: {
    textAlign: 'center',
    'background-color': 'gray',
  },
  media: {
    height: 50,
  }
}));


function App() {
  const classes = useStyles();

  return <AppBar position="static">
    <Toolbar className={classes.header}>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <img src={hackathon} alt={'Wir vs. Virus Hackathon'} className={classes.media} />
    </Toolbar>
  </AppBar>;
}

export default App;
