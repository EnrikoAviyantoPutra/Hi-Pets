import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Link,
  Snackbar
} from '@material-ui/core'
import { signup } from '../helpers/auth'
import { useDispatch } from 'react-redux'
import { register } from '../store/actions/userAction'
import gridUseStyles from '../helpers/gridStyles'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog() {
  const dispatch = useDispatch()

  const [formRegister, setFormRegister] = useState({})
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false);
  const history = useHistory()
  const classes = gridUseStyles()
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    setFormRegister((prev) => ({ ...prev, [name]: value }));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formRegister)
    try {
      const data = await signup(formRegister.email, formRegister.password)
      console.log(data)
      await dispatch(register(formRegister))
      history.push('/home')
    } catch (error) {
      setError(error.message)
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Link component="button" variant="h6" onClick={handleClickOpen} className={classes.text2}>
        Register
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-login">Register</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please fill in the form below
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={formRegister.name}
              onChange={(e) => handleChange(e)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formRegister.email}
              onChange={(e) => handleChange(e)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formRegister.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              value={formRegister.phoneNumber}
              onChange={(e) => handleChange(e)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
          {
            error ? (
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            ) : <p></p>
          }
        </form>
      </Dialog>
    </div>
  );
}
