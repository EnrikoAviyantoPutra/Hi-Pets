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
    height: '30vh'
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
  rootCard: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}));

export default useStyles