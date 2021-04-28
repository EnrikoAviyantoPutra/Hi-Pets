import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Button,
  Grid,
  TextField,
  Snackbar,
  CircularProgress,
  Card,
  Typography,
  CardContent
} from '@material-ui/core'
import { signin } from '../helpers/auth'
import { useHistory } from 'react-router';
import { login } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../helpers/style'
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import logo from '../assets/logo.png'
import RegisterModal from '../components/RegisterModal'
import gridUseStyles from '../helpers/gridStyles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginForm() {
  const classes = useStyles()
  const gridClasses = gridUseStyles()
  const dispatch = useDispatch()
  const [error, setError] = useState('');
  const history = useHistory()
  const [loginForm, setForm] = useState({
    email: '',
    password: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const status = e.target.id
    const value = e.target.value
    console.log(status)
    switch (status) {
      case 'email':
        setForm({ ...loginForm, email: value })
        break
      case 'password':
        setForm({ ...loginForm, password: value })
        break
      default:
        setForm({
          email: '',
          password: ''
        })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signin(loginForm.email, loginForm.password)
      console.log(data)
      await dispatch(login(loginForm))
      history.push('/home')
    } catch (error) {
      setError(error.message)
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const { loading } = useSelector(state => ({
    loading: state.userReducer.loading
  }))

  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <Card style={{ marginLeft: 50 }}>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid>
            <img src={logo} alt="logo" style={{ height: 100, marginLeft: 0, marginTop: 15 }}></img>
          </Grid>
          <Grid container item xs={6}>
            <FormControl fullWidth={true} size="medium" margin="dense" style={{ marginTop: 24 }}>
              <TextField variant="outlined" label="Email" color="primary" aria-describedby="my-helper-text" id="email" name="email" onChange={handleChange} value={loginForm.email} type="email" />
            </FormControl>
          </Grid>
          <Grid container item xs={6}>
            <FormControl fullWidth={true} size="large" margin="dense">
              <TextField variant="outlined" label="Password" color="primary" aria-describedby="my-helper-text" id="password" name="password" onChange={handleChange} value={loginForm.password} type="password" />
            </FormControl>
          </Grid>
          {
            error ? (
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            ) : <p></p>
          }
          <Grid item xs={3}>
            <div className={classes.wrapper}>
              <FormControl fullWidth={true}>
                <Button variant="contained" className={[buttonClassname, classes.button]} onClick={(e) => { handleButtonClick(e); handleSubmit(e); }} disabled={loading}>Login</Button>
              </FormControl>
              {loading && <CircularProgress size={24} thickness={4.6} className={classes.buttonProgress} />}
            </div>
          </Grid>
          <Grid item xs={12} className={[gridClasses.center, gridClasses.control]} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" className={gridClasses.text3}>Didn't have an account? <RegisterModal /> </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}