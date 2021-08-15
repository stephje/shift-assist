import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit'
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            ShiftAssist
          </Typography>
          {Auth.loggedIn() ? (
          <Button variant="contained" color="primary" onClick={logout} disableElevation>Logout</Button>
          ) : (
            <>
          <Button variant="contained" color="primary" component={Link} to="/login" disableElevation>Login</Button>
            </>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}