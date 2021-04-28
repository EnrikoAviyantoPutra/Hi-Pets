import React, { useState } from 'react'
import {
  FormControl,
  Button,
  Grid,
  Typography,
  TextField,
  CardMedia,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDoctor } from '../store/actions/doctorAction'
import gridUseStyles from '../helpers/gridStyles'
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import gambar from '../assets/vet-edited.png'
import logo from '../assets/logo.png'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginPage() {
  const classes = gridUseStyles()
  const [formValue, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (e) => {
    let { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = await dispatch(getDoctor(formValue))
      console.log(data, '<<< data');
      if (Object.keys(data)[0] === 'msg') {
        setError('Invalid email/password')
        setOpenSnackbar(true)
      } else {
        history.push({ pathname: '/chatroom', state: data.access_token })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const { loading } = useSelector(state => ({
    loading: state.doctorReducer.loading
  }))

  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <Grid container className={classes.root} style={{ backgroundColor: '#e4ecf6', height: '100vh' }}>
      <Grid item xs={12} style={{ display: 'flex' }}>
        <Grid container className={classes.container} >
          <Grid item xs={12}>
            <Card style={{ marginLeft: 50 }}>
              <CardContent>
                <Grid container direction="column" alignItems="center">
                  <Grid>
                    <img src={logo} alt="logo" style={{ height: 100, marginLeft: 0, marginTop: 15 }}></img>
                  </Grid>
                  <Grid container item xs={6}>
                    <FormControl fullWidth={true} size="medium" margin="dense">
                      <TextField variant="outlined" label="Email" color="primary" aria-describedby="my-helper-text" id="email" name="email" onChange={handleChange} value={formValue.email} type="email" />
                    </FormControl>
                  </Grid>
                  <Grid container item xs={6}>
                    <FormControl fullWidth={true} size="large" margin="dense">
                      <TextField variant="outlined" label="Password" color="primary" aria-describedby="my-helper-text" id="password" name="password" onChange={handleChange} value={formValue.password} type="password" />
                    </FormControl>
                  </Grid>
                  {
                    error ? (
                      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                        style={{ marginLeft: '12.4vh' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      >
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
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 90, marginRight: 30, marginLeft: 30 }}>
          <CardMedia>
            <img src={gambar} style={{ height: '25em', width: '50em' }} alt="veterinarian" />
          </CardMedia>
        </Grid>
      </Grid>
    </Grid>
  )
}