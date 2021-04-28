import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -10%)'
  }
}));

export default function EmptyChat() {
  const classes = useStyles();
  return (
    <div className={classes.positionCenter}>
      <Grid container direction="row" justify="center">
        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_DuFU3e.json" background="transparent" speed="1"  style={{ width: 300, height: 300 }} loop autoplay></lottie-player>
      </Grid>
      <Grid container direction="row" justify="center">
        <Typography variant="subtitle2" color="textSecondary">You don't have a message. Please refresh</Typography>
      </Grid>
    </div>
  )
}