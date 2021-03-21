import { makeStyles } from '@material-ui/core'
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
    height: '33vh'
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
  }
}));

export default useStyles