import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import {
  Typography,
  Grid,
  Avatar,
  Button
} from '@material-ui/core'

import AppBar from '../components/AppBar'
import DrawerHeader from '../components/DrawerHeader'
import useStyles from '../helpers/style'
import gridUseStyles from '../helpers/gridStyles'
import CardRoute from '../components/CardRoute'
import { db } from '../services/firebase'
import CardArtikel from '../components/CardArtikel'
import { useHistory } from 'react-router';


export default function HomePage() {
  const gridClasses = gridUseStyles()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [articles, setArticles] = useState([])
  const history = useHistory()
  function handleMainOpen(isOpen) {
    setOpen(isOpen)
  }
  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    async function fetchArticles() {
      try {
        db.ref("articles").on("value", snapshot => {
          let articlesFirebase = [];
          snapshot.forEach((snap) => {
            articlesFirebase.push(snap.val());
          });
          setArticles(c => articlesFirebase)
        });
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchArticles()
  }, []);


  const artikelNews = (payload) => {
    console.log(payload)
    const win = window.open(payload, "_blank");
  }

  const moreNews = () => {
    history.push('/morenews')
    // console.log('asd')
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar handleMainOpen={handleMainOpen} />
        {/* <Grid item xs={12} container style={{ flexDirection: 'column' }}> */}
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <DrawerHeader />
          <Grid container className={gridClasses.root} spacing={4} >
            <Grid item xs={12} className={gridClasses.display}>
              <CardRoute />
            </Grid>
            {
              articles.map((article) => (
                <CardArtikel key={article.title} articles={article} />
              ))
            }

          </Grid>
        </main>

      </div>
      <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={moreNews} style={{ backgroundColor: 'red' }}>
          More News
        </Button>
      </Grid>

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
    </>
  )
}