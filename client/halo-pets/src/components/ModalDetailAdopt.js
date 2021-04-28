import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  Dialog,
  Typography,
  Fab,
  Grid,
  Avatar
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

function formatDDMMMYY(s) {
  var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  var b = s.split(/\D/);
  return b[2] + ' ' + months[b[1]-1] + ' ' + b[0];
}

function convertDate(d) {
  d = new Date(d);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
}

export default function ModalDetailAdopt({ open, pet, handleCloseModalDetail }) {
  const classes = useStyles();

  console.log(pet, '<<<< pet detail');

  const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `300px` }} />,
      containerElement: <div style={{ height: `300px` }} />,
      mapElement: <div style={{ height: `300px` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: pet.latitude, lng: pet.longitude }}
    >
      {props.isMarkerShown && <Marker position={{ lat: pet.latitude, lng: pet.longitude }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )

  function emailClicked(email) {
    console.log('click email');
    const mailto = `mailto:${email}?subject=I wanna adopt your pet subject&body=Hello, Can i adopt ur pet ? Please answer this email`
    window.location.href = mailto;
  }

  async function phoneClicked(phone) {
    try {
      console.log(phone)
      let phoneto = 'tel:+62'
      for (let i in phone) {
        if (i !== '0') {
          phoneto += phone[i]
        }
      }
      window.location.href = phoneto;
    } catch (error) {
      console.log(error)
    }
  }

  async function whatsappClicked(phone) {
    try {
      let hasil = '62'
      for (let i in phone) {
        if (i !== '0') {
          hasil += phone[i]
        }
      }
      const url = `https://api.whatsapp.com/send?phone=${hasil}`;
      const win = window.open(url, "_blank");
      win.focus();
    } catch (error) {
      console.log(error)
    }
  }

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
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <CardMedia
                className={classes.media}
                image={pet.image_url}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='center' alignItems='center'>
              <Typography component="h5" variant="h5">
                {pet.name}
              </Typography>
              <Fab size="small" aria-label="add" className={classes.margin} variant="extended" style={{ backgroundColor: '#f8f1f1' }}>
                {pet.species.toUpperCase()}
              </Fab>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">Date of Birth </Typography>
              </Grid>
              <Grid item>
                <Typography paragraph>
                  {formatDDMMMYY(convertDate(pet.dob))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item style={{ marginRight: '2.5rem'}}>
                <Typography variant="subtitle1" color="textSecondary">Gender </Typography>
              </Grid>
              <Grid item>
                <Typography paragraph>
                  {pet.gender}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container wrap="wrap" spacing={2}>
              <Grid item style={{ marginRight: '0.5rem'}}>
                <Typography variant="subtitle1" color="textSecondary">Description </Typography>
              </Grid>
              <Grid item xs>
                <Typography paragraph>
                  {pet.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item style={{ marginRight: '2.6rem'}}>
              <Typography variant="subtitle1" color="textSecondary">Owner </Typography>
            </Grid>
            <Grid item>
              <Typography paragraph>
                {pet.User.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '2rem' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs={6} align="center">
              <Fab size="large" color="secondary" aria-label="add" className={classes.margin} onClick={() => emailClicked(pet.User.email)} style={{ backgroundColor: '#16c79a' }}>
                <EmailIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} align="center">
              <Fab size="large" color="secondary" aria-label="add" className={classes.margin} onClick={() => phoneClicked(pet.User.phoneNumber)} style={{ backgroundColor: '#19456b' }}>
                <CallIcon />
              </Fab>
              <Fab size="large" color="secondary" aria-label="add" className={classes.margin} onClick={() => whatsappClicked(pet.User.phoneNumber)} style={{ backgroundColor: '#11698e' }}>
                <WhatsAppIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs={6} align="center">
              {pet.User.email}
            </Grid>
            <Grid item xs={6} align="center">
              {pet.User.phoneNumber}
            </Grid>
          </Grid>
        </Grid>
        <MyMapComponent isMarkerShown={true} />
      </DialogContent >
    </Dialog>
  )
}