import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  Tooltip,
  IconButton,
  GridListTileBar,
  Modal,
  Fade,
  Backdrop,
  CardContent,
  Typography,
  Fab
} from '@material-ui/core';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rootCard: {
    margin: 'auto',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    width: 1000,
    height: 600,
    // overflow: 'initial',
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
    overflowY: 'scroll'
  },
  media: {
    width: '60%',
    zIndex: 2,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginTop: theme.spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: 'white',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: '60%',
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
    marginRight: '1rem'
  },
  content: {
    flex: '1 0 auto',
    // overflowY: 'scroll'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ModalDetailAdopt({ open, pet, handleCloseModalDetail }) {
  const classes = useStyles();

  console.log(pet, '<<<< pet detail');
  function convertDate(d) {
    d = new Date(d);
    return [d.getFullYear(), d.getMonth()+1, d.getDate()]
        .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
  }

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

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModalDetail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
        <Card className={classes.rootCard}>
          <CardMedia
            className={classes.media}
            image={pet.image_url}
          />
          <GridListTileBar
            title=""
            titlePosition="top"
            actionIcon={
              <>
              <span className={classes.close} onClick={handleCloseModalDetail}>&times;</span>
              </>
            }
            actionPosition="right"
            className={classes.actionBar}
          />
          <CardContent className={classes.content} style={{ width: '60%', paddingTop: '3rem' }}>
            <Typography component="h5" variant="h5">
              {pet.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {pet.species}
            </Typography>
            <Typography>
              Date of Birth : {convertDate(pet.dob)}
            </Typography>
            <Typography>
              Description : {pet.description}
            </Typography>
            <Typography>
              {pet.User.name}
            </Typography>
            <Typography>
              lat : {pet.latitude}, lon : {pet.longitude}
            </Typography>
            {/* <div style={{ width: 100, height: 200 }}> */}
            <MyMapComponent isMarkerShown={true} />
            {/* </div> */}
            <Fab size="large" color="secondary" aria-label="add" className={classes.margin}>
              <CallIcon />
            </Fab>
            {pet.User.phoneNumber}
            <Fab size="large" color="secondary" aria-label="add" className={classes.margin}>
              <EmailIcon />
            </Fab>
            {pet.User.email}
          </CardContent>
        </Card>
      </Fade>
      </Modal>
    </div>
  )
}