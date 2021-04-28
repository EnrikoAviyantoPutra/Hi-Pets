import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import imgPaw from '../assets/paw.png'
import imgCat from '../assets/cat.png'
import imgDog from '../assets/dog.png'
import imgMyPet from '../assets/adoption.png'

const useStyles = makeStyles((theme) => ({
  rootCard: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardPetSpecies: {
    maxWidth: 250,
    maxHeight: 300,
    margin: '1rem'
  },  
  image: {
    width: '80%',
    height: '80%'
  }
}))

export default function CardFilterAdopt({ handleFilterAdopt, handleFilterMyPet }) {
  const classes = useStyles();
  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#113461' }}><b>Filter Pet</b></Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card className={classes.cardPetSpecies}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <img src={imgPaw} className={classes.image} />
                <Button variant="contained" style={{ marginTop: 16, backgroundColor: '#113461', color: 'white' }} onClick={(e) => handleFilterAdopt('', e)}>All</Button>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.cardPetSpecies}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <img src={imgMyPet} className={classes.image} />
                <Button variant="contained" style={{ marginTop: 16, backgroundColor: '#113461', color: 'white' }} onClick={(e) => handleFilterMyPet(localStorage.getItem('user_id'), e)}>My Pet</Button>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.cardPetSpecies}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <img src={imgDog} className={classes.image} />
                <Button variant="contained" style={{ marginTop: 16, backgroundColor: '#113461', color: 'white' }} onClick={(e) => handleFilterAdopt('dog', e)}>Dog</Button>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.cardPetSpecies}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <img src={imgCat} className={classes.image} />
                <Button variant="contained" style={{ marginTop: 16, backgroundColor: '#113461', color: 'white' }} onClick={(e) => handleFilterAdopt('cat', e)}>Cat</Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </CardContent>
    </Card>
  )
}