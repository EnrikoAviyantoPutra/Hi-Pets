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
import CardArtikel from '../components/CardArtikel'

export default function MoreNews() {
  const [news, setNews] = useState([])
  const gridClasses = gridUseStyles()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=pets&apiKey=6661efc5b1a74643ad46fee6f447edf7')
        const data = await response.json()
        console.log(data.articles)
        setNews(data.articles)
      } catch (error) {
        console.log(error);
      }
    }
    fetchNews()
  }, [setNews])

  function handleMainOpen(isOpen) {
    setOpen(isOpen)
  }

  function shortenContent(content) {
    let shorten = ''
    if (content) {
      for (let i = 0; i < 70; i++) {
        shorten += content[i]
      }
      shorten += '...'
    }
    return shorten
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar handleMainOpen={handleMainOpen} />
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
              news.map((article) => (
                <CardArtikel key={article.title} articles={{ content: shortenContent(article.content), date: article.publishedAt, image: article.urlToImage, link: article.url, title: article.title }} />
              ))
            }

          </Grid>
        </main>

      </div>

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