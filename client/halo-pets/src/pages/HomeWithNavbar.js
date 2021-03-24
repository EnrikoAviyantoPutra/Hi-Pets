import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Container, CircularProgress } from '@material-ui/core';
import Header from '../components/Header';
import MainFeaturedPost from '../components/MainFeatured';
import CardArtikel from '../components/CardArtikel';
import gridUseStyles from '../helpers/gridStyles'
import { db } from '../services/firebase'
import { useHistory } from 'react-router';
import useStylesAdoption from '../helpers/styleAdoption'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PetsIcon from '@material-ui/icons/Pets'
import HealingRoundedIcon from '@material-ui/icons/HealingRounded';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Adoption', url: '/adoption' },
  { title: 'My Pet Favorites', url: '/favorites' },
  { title: 'Health Care', url: '/healthcare' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://cdn.discordapp.com/attachments/822083494762119168/823913593552371712/slide4.png',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

function formatDDMMMYY(s) {
  var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  var b = s.split(/\D/);
  return b[2] + ' ' + months[b[1]-1] + ' ' + b[0];
}

function convertDate(d) {
  d = new Date(d);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
}

export default function Blog() {
  const classes = useStyles();

  const gridClasses = gridUseStyles()
  const [articles, setArticles] = useState([])
  const history = useHistory()
  const [clickedMoreNews, setClickedMoreNews] = useState(false)
  const [news, setNews] = useState([])
  const [loadingNews, setLoadingNews] = useState(false);
  const styles = useStylesAdoption();



  const page = (payload) => {
    // e.preventDefault()
    history.push(`/${payload}`)
    console.log('masuk');
  }


  const moreNews = (e) => {
    e.preventDefault()
    // history.push('/morenews')
    setClickedMoreNews(true)
  }

  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {

      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // setLatitude(position.coords.latitude)
      // setLongitude(position.coords.longitude)
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
        // setreadError(error.message)
        console.log(error.message)
      }
    }

    async function fetchNews() {
      try {
        setLoadingNews(true)
        const response = await fetch('https://newsapi.org/v2/everything?q=animal&apiKey=6661efc5b1a74643ad46fee6f447edf7')
        const data = await response.json()
        console.log(data.articles)
        setNews(data.articles)
        setLoadingNews(false)
      } catch (error) {
        console.log(error);
      }
    }

    if (clickedMoreNews) {
      fetchNews()
    } else {
      fetchArticles()
    }
  }, [clickedMoreNews]);

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

  console.log(news, 'NNNews');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Hi Pets" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* <Grid container spacing={4}> */}
          {/* {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} */}
          {/* </Grid> */}
          <Grid container item xs={12} direction='row'  justify='center'>
            <Button
              variant="contained"

              // color="secondary"
              className={styles.button}
              startIcon={<HealingRoundedIcon />}
              onClick={(e) => page('healthcare')}
              style={{ backgroundColor: '#1b4453', color: 'white', marginRight: '2rem' }}
            >
              Healthcare
                      </Button>
            <Button
              variant="contained"
              // color="secondary"
              className={styles.button}
              startIcon={<PetsIcon />}
              onClick={(e) => page('adoption')}
              style={{ backgroundColor: '#1b4453', color: 'white', marginLeft: '2rem' }}
            >
              Adoption
            </Button>
          </Grid>
          <Grid container className={gridClasses.root} spacing={4} >

            {
              articles.map((article, index) => (
                <CardArtikel key={article.title} articles={article} index={index} />
              ))
            }

          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            {/* <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
          </Grid>
          {
            !clickedMoreNews ? (
              <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 32 }}>
                <Button onClick={moreNews} style={{ backgroundColor: '#54bba3', color: 'white' }}>
                  More News
                </Button>
              </Grid>
            ) : (
              <Grid container className={gridClasses.root} spacing={4} >
                {
                  loadingNews ? (
                    <Grid container direction="row" justify="center">
                      <CircularProgress color="secondary" style={{ height: 50, width: 50, marginTop: '4rem', marginBottom: '4rem' }} />
                    </Grid>
                  ) :
                  news.map((article, index) => (
                    <CardArtikel key={article.title} articles={{ content: shortenContent(article.content), date: formatDDMMMYY(convertDate(article.publishedAt)), image: article.urlToImage, link: article.url, title: article.title }}  index={index} />
                  ))
                }
              </Grid>
            )
          }

        </main>
      </Container>
      {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
    </React.Fragment>
  );
}