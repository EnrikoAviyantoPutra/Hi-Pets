import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    textAlign: 'center'
  },
  content: {
    height: '33.4vh'
  },
  display: {
    display: 'flex'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(1),
  },
  formWidth: {
    width: 1000
  },
  text: {
    color: '#f8f1f1'
  },
  text2: {
    color: '#11698e'
  },
  text3: {
    color: '#19456b'
  },
  button: {
    background: 'linear-gradient(45deg, #16c79a 30%, #11698e 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  snackbar: {
    position: 'absolute',
    bottom: theme.spacing(2),
  },
  buttonProgress: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

export default useStyles