import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

export default function ErrorNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.positionCenter}>
      <Grid container direction="row" justify="center">
      <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ueovf9mk.json" background="transparent"  speed="1"  style={{width: '300px', height: '300px'}}  loop autoplay></lottie-player>
      </Grid>
      <Grid container direction="row" justify="center">
        <Typography>Sorry, page is not available yet</Typography>
      </Grid>
    </div>
  )
}