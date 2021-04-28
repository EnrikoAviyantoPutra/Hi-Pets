import React from 'react'
import AppBar from '../components/AppBar'
import useStyles from '../helpers/style'
import {
  Avatar,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRoom } from "../store/actions/chatAction";

const useStylesChatList = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  rootCard: {
    margin: 'auto',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    width: '100%',
    height: 600,
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

export default function Chat() {
  const classes = useStyles()
  const styles = useStylesChatList()
  const dispatch = useDispatch()
  const [room, setRoom] = useState([])
  const history = useHistory()
  const location = useLocation()

  useEffect(async () => {
    console.log(location.state)
    try {
      const data = await dispatch(getRoom())
      setRoom(data)
      console.log(localStorage.getItem('access_token'))
    } catch (error) {
      console.log(error, 'ini error');
    }
  }, [dispatch])

  function toChat(id) {
    history.push({ pathname: '/chat', state: id })
  }

  return (
    <>
      <AppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 16 }}>List Chat</Typography>
        <List>
          {
            room.length === 0 ? (
              <div className={classes.positionCenter}>
                <Grid container direction="row" justify="center">
                  <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_DuFU3e.json" background="transparent" speed="1" style={{ width: 300, height: 300 }} loop autoplay></lottie-player>
                </Grid>
                <Grid container direction="row" justify="center">
                  <Typography>Sorry, you don't have a message.</Typography>
                </Grid>
              </div>
            ) :
              room.map(el => {
                return (
                  <Card className={classes.rootCard}>
                    <ListItem className={classes.root} key={el.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>{el.User.name.slice(0, 1)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText style={{ paddingTop: 8 }}
                          primary={el.User.name}
                        />
                      </ListItem>
                      <Button type="button" onClick={() => toChat(el.id)} variant="contained" color="secondary">Chat</Button>
                    </ListItem>
                  </Card>
                )
              })
          }
        </List>
      </main>
    </>
  )

}