import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Toolbar,
  Typography,
  Button,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
  Grow
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  buttonEndChat: {
    borderColor: '#b54933',
    color: '#b54933',
    borderWidth: 1.5,
    marginRight: 16,
    '&:hover, &$focusVisible': {
      backgroundColor: '#b54933',
      color: 'white'
    },
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  function handleLogout(event) {
    localStorage.clear()
    history.push('/')
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar} style={{ backgroundColor: '#54bba3' }}>
        <img src={logo} style={{ width: '5%', height: '5%' }} />
        <Typography
          component="h2"
          variant="h5"
          align="center"
          noWrap
          className={classes.toolbarTitle}
          style={{ color: 'white' }}
        >
          Hi Pets Doctor
        </Typography>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{textTransform: 'none', fontSize: 16, color: 'white' }}
        >
          {localStorage.getItem('email')}
          {
            !open ? (<ExpandMoreIcon />) : (<ExpandLessIcon />)
          }
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleLogout} style={{ paddingLeft: 24, paddingRight: 24 }}><ExitToAppIcon style={{ marginRight: 8 }}/> Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};