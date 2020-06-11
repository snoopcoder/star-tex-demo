import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TokenLoader from './Components/TokenLoader';
import MainForm from './Components/MainForm';
import WebSocket from './Components/WebSocket';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Система подачи заявки на доставку груза
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          width="100%"
          minHeight="calc(100vh - 64px)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid container>
            <Grid item xs={false} md={2} xl={3} />
            <Grid item xs={12} md={8} xl={6}>
              <TokenLoader>
                {({ token }) => (
                  <>
                    <WebSocket token={token} />
                    <MainForm token={token} />
                  </>
                )}
              </TokenLoader>
            </Grid>
          </Grid>
          <Box width="100%">2020г</Box>
        </Box>
      </div>
    </div>
  );
}

export default App;
