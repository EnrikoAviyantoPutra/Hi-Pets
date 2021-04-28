import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterModal from '../components/RegisterModal'
import gambar from '../assets/vet-edited.png'
import logo from '../assets/logo.png'
import {
  Typography,
  Grid,
  CardMedia
} from '@material-ui/core'
import gridUseStyles from '../helpers/gridStyles'

export default function RegisLoginPage() {
  const classes = gridUseStyles()

  return (
    <Grid container className={classes.root} style={{ backgroundColor: '#e4ecf6', height: '100vh'}}>
      <Grid item xs={12} style={{display: 'flex'}}>
        <Grid container className={classes.container} >
          <Grid item xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
        <Grid style={{marginTop: 90, marginRight: 30, marginLeft: 30}}>
            <CardMedia>
              <img src={gambar} style={{height: '25em', width: '50em'}} alt="veterinarian"/>
            </CardMedia>
        </Grid>
      </Grid>
    </Grid>
  )
}