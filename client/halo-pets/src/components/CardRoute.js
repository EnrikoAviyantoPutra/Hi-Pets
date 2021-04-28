import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import imgPaw from '../assets/paw.png'
import imgMyPet from '../assets/adoption.png'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  rootCard: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    boxShadow: '0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.25)',
  },
  cardRoute: {
    maxWidth: 400,
    maxHeight: 300,
    boxShadow: '0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.25)',
    margin: '1rem'
  },
  image: {
    width: '50%',
    height: '50%'
  }
}))

export default function CardRoute() {
  const history = useHistory()
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Card className={classes.cardRoute}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <img src={imgPaw} className={classes.image} />
              <Button variant="contained" color="secondary" style={{ marginTop: 16 }} onClick={() => history.push('/healthcare')}>Health Care</Button>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.cardRoute}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <img src={imgMyPet} className={classes.image} />
              <Button variant="contained" color="primary" style={{ marginTop: 16 }} onClick={() => history.push('/adoption')}>Adopt a Pet</Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}