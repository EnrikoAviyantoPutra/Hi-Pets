import { Avatar, Grid, Typography } from '@material-ui/core'
import gridUseStyles from '../helpers/gridStyles'

export default function Footer() {
  const gridClasses = gridUseStyles()
  return (
    <Grid item xs={12} style={{ backgroundColor: '#11698e' }}>
      <Grid container className={gridClasses.content} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid item={true} xs={2}>
          <Grid container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar component="div" style={{ height: '20vh', width: '20vh' }} src="https://lh3.googleusercontent.com/xcjoVGcqrQClcqI1uXacQnGNaKoOLuzVPdeYQ2C32rz1845IxIpeyLmBJGDjo-T9DlH-THM=s128" width="100%" />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" className={gridClasses.text}>About us</Typography>
              <Typography variant="p" className={gridClasses.text}>
                Your pet need health attention too.Halo pet's answer your need to have personal veterinarian close to you.
                You could also adopt cute pet's that you want to add to your family, or you can give your pet to someone willing to take care with full love.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={2}>
          <Grid container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar component="div" style={{ height: '20vh', width: '20vh' }} src="https://lh3.googleusercontent.com/xcjoVGcqrQClcqI1uXacQnGNaKoOLuzVPdeYQ2C32rz1845IxIpeyLmBJGDjo-T9DlH-THM=s128" width="100%" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}