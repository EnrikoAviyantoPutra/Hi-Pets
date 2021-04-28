import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    flexGrow: 1
  },
}));

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Adoption', url: '/adoption' },
  { title: 'My Pet Favorites', url: '/favorites' },
  { title: 'Health Care', url: '/healthcare' },
];

export default function Loading() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Hi Pets" sections={sections} />
        <main>
          <Grid container className={classes.root} spacing={4} >
            <Grid container direction="row" justify="center" style={{ marginTop: '30vh' }}>
              <CircularProgress style={{ height: 80, width: 80, color: '#3c8c7c' }} />
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  )
}