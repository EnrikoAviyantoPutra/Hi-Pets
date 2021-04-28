import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  Dialog,
  Typography,
  Fab,
  Grid,
  Avatar,
  CircularProgress
} from '@material-ui/core';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import CallIcon from '@material-ui/icons/Call';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rootCard: {
    margin: 'auto',
    borderRadius: theme.spacing(2),
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    width: 1000,
    height: 600,
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(2),
    },
  },
  media: {
    width: '100%',
    zIndex: 0,
    marginTop: theme.spacing(-3),
    height: '50vh',
    paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: 'white',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      marginLeft: theme.spacing(3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
  },
  actionBar: {
    background: 'white',
    borderRadius: theme.spacing(2),
  },
  icon: {
    color: 'white',
    opacity: 0.8
  },
  iconIsFav: {
    color: '#f50057',
    opacity: 0.8
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    color: '#aaa',
    float: 'right',
    fontSize: 28,
    fontWeight: 'bold',
    "&:hover": {
      color: 'black',
      textDecoration: 'none',
      cursor: 'pointer'
    },
  },
  content: {
    flex: '1 0 auto',
    paddingTop: theme.spacing(30)
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const stylesDialog = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(stylesDialog)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ModalDetailAdopt({ open, handleCloseModalDetail }) {
  const classes = useStyles();
  return (
    // <div>
    <Dialog
      open={open}
      onClose={handleCloseModalDetail}
      scroll='body'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleCloseModalDetail}>Detail Pet</DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row" justify="center">
            <CircularProgress style={{ height: 50, width: 50, marginTop: '4rem', marginBottom: '4rem', color: '#3c8c7c' }} />
          </Grid>
          <Typography style={{ margin: '1rem', color: 'white' }}>aaaaaaaaaaaaaaaaaaaaaaa</Typography>
      </DialogContent >
    </Dialog>
  )
}