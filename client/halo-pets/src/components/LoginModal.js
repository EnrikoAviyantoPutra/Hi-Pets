import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { signin } from '../helpers/auth'
import { useHistory } from 'react-router';
import { login } from '../store/actions/userAction';
import { useDispatch } from 'react-redux';

export default function FormDialog() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory()
  const [loginForm, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const status = e.target.id
    const value = e.target.value
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signin(loginForm.email, loginForm.password)
      console.log(data)
      await dispatch(login(loginForm))
      history.push('/home')
    } catch (error) {
      setError(error.message)
      alertError(error.message)
    }
  }
  const alertError = async (err) => {
    alert(err)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-login">Login</DialogTitle>
        <form
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <DialogContentText>
              Please Fill In teh Form Below
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={loginForm.email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={loginForm.password}
              onChange={(e) => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button type="submit" color="primary">
              Login
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
