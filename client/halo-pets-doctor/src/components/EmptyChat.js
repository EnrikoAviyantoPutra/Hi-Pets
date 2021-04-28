import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '65%',
    transform: 'translate(-50%, -50%)'
  }
}));

export default function EmptyChat() {
  const classes = useStyles();
  return (
    <div className={classes.positionCenter}>
      <Grid container direction="row" justify="center">
        <Typography style={{ marginTop: 20 }}>Click user to start chatting!</Typography>
      </Grid>
    </div>
  )
}