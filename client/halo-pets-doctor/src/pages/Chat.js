import React, { useState, useEffect } from 'react'
import useStyles from '../helpers/style'
import AppBar from '../components/AppBar'
import {
  Button,
  TextField,
  FormControl,
  List,
  ListItemText,
  Typography,
  ListItem,
  Box,
  Grid
} from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { db } from "../services/firebase"

function timeConverter(UNIX_timestamp){
  var date = new Date(UNIX_timestamp);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);

  return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
}

export default function Chat() {
  const classes = useStyles()
  const [user, setUser] = useState('test-temp-doctor')
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [readError, setreadError] = useState(null)
  const [writeError, setwriteError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    console.log(location.state)
    setreadError(null)
    async function fetchMessages() {
      try {
        const roomId = db.ref("chats")
        roomId.child(`${location.state}`).on("value", snapshot => {
          let chatsFirebase = [];
          snapshot.forEach((snap) => {
            chatsFirebase.push(snap.val());
          });
          setChats(c => chatsFirebase)
        });
      } catch (error) {
        setreadError(error.message)
      }
    }
    fetchMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setwriteError(null)
    try {
      const roomId = db.ref("chats")
      await roomId.child(`${location.state}`).push({
        content,
        timestamp: Date.now(),
        uid: user,
        role: 'doctor'
      });
      setContent('')
    } catch (error) {
      setwriteError(error.message)
    }
  }
  function handleChange(e) {
    setContent(e.target.value)
  }

  function toVidCall() {
    const url = `https://halopets.daily.co/${location.state}`;
    const win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div className={classes.root}>
      <AppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <List>
          {
            chats.map(chat => {
              return (
                <ListItem key={chat.timestamp}>
                  <ListItemText style={{textAlign: chat.role === 'doctor' ? 'right': 'left'}}>
                    <Box>
                      <Typography variant="h6">{chat.content}</Typography>
                      <Typography variant="subtitle1" color="textSecondary" size="small">{timeConverter(chat.timestamp)}</Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              ) 
            })
          }
        </List>
        <Grid container style={{position: 'fixed', bottom: 10}}>
          <Grid item xs={12}>
            <form className={classes.root} onSubmit={handleSubmit}>
              <FormControl style={{width: "78%"}}>
                <TextField value={content} onChange={handleChange} size="small" variant="outlined" />
              </FormControl>
              {readError ? <p>{writeError}</p> : null}
              <Button style={{width: "10%"}} type="submit" size="large">Send</Button>
              <Button type="button" onClick={toVidCall} size="large">Video Call</Button>
            </form>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}