import {
  Typography,
  Grid,
  Avatar,
  Link,
  Button
} from '@material-ui/core'
import { CardActionArea, Card, CardContent, Hidden, CardMedia } from '@material-ui/core';


export default function CardArtikel({articles, index}) {
  const {content, date, image, link, title} = articles


  const artikelNews = (payload) =>{
    console.log(payload)
    const win = window.open(payload, "_blank");
  }

  return (
    <Grid item xs={12} md={6} style={{ marginTop: 25 }}>
      <CardActionArea>
        <Card style={{ display: 'flex', height: 225 }}>
          {
            index % 2 !== 0 ? (
              <>
              <div style={{ flex: 1 }}>
                <CardContent>
                  <Typography style={{ fontSize: '1.25em', color: '#384259', fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '1em' }}>
                    {date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph style={{ fontSize: '1em', marginTop: '1rem' }}>
                    {content.slice(0, (content.length - 1))} ...
                    <Link component="button" onClick={() => artikelNews(link)} style={{ textTransform: 'none', paddingLeft: 4 }}>
                      Continue reading
                    </Link>
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia style={{ width: 250 }} image={image} />
              </Hidden>
              </>
            ) : (
              <>
              <Hidden xsDown>
                <CardMedia style={{ width: 250 }} image={image} />
              </Hidden>
              <div style={{ flex: 1 }}>
                <CardContent>
                  <Typography style={{ fontSize: '1.25em', color: '#384259', fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '1em' }}>
                    {date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph style={{ fontSize: '1em', marginTop: '1rem' }}>
                    {content.slice(0, (content.length - 1))} ...
                    <Link component="button" onClick={() => artikelNews(link)} style={{ textTransform: 'none', paddingLeft: 4 }}>
                      Continue reading
                    </Link>
                  </Typography>
                </CardContent>
              </div>
              </>
            )
          }
        </Card>
      </CardActionArea>
    </Grid>
  )
}