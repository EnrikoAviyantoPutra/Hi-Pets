import React from 'react';
import useStyles from '../helpers/style'
import {
  CssBaseline,
  AppBar,
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
import { useHistory } from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory()

  function handleLogout(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#16c79a' }}>
        <Toolbar className={classes.root} style={{ justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6" noWrap>
              Hi Pets Doctor
            </Typography>
          </div>
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              style={{ textTransform: 'none', fontSize: 16, color: 'white' }}
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
                  <Paper style={{ paddingLeft: 24, paddingRight: 24 }}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleLogout}><ExitToAppIcon style={{ marginRight: 8 }} /> Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
