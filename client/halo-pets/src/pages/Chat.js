import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import {
  makeStyles,
  Paper,
  Divider,
  List,
  Grid,
  ListItemText,
  Box,
  TextField,
  Fab,
  Container,
} from '@material-ui/core'
import Header from '../components/Header'
import { getRoom } from '../store/actions/chatAction'
import SendIcon from '@material-ui/icons/Send'
import VideoCallIcon from '@material-ui/icons/VideoCall'

function timeConverter(UNIX_timestamp) {
  var date = new Date(UNIX_timestamp);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '85vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto'
  },
  root: {
    flexGrow: 1
  }
});

export default function Chat() {
  const [user, setUser] = useState(auth().currentUser)
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [readError, setreadError] = useState(null)
  const [writeError, setwriteError] = useState(null)
  const location = useLocation()
  const classes = useStyles();
  const dummy = useRef()
  const dispatch = useDispatch()
  const [RoomVideo, setRoomVideo] = useState([])

  useEffect(() => {
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
    const url = 'https://api.daily.co/v1/rooms';
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer becea18a103ea46caf68daad57ed840de8cfadbedc137db19d824b42719b3b63'
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setRoomVideo(json.data)
      })
      .catch(err => console.error('error:' + err));
    fetchMessages();
  }, []);

  async function handleSubmit(e) {
    console.log(location.state)
    e.preventDefault();
    setwriteError(null)
    try {
      const roomId = db.ref("chats")
      await roomId.child(`${location.state}`).push({
        content,
        timestamp: Date.now(),
        uid: user.uid,
        role: 'client'
      });
      setContent('')
      dummy.current.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      setwriteError(error.message)
    }
  }
  function handleChange(e) {
    setContent(e.target.value)
  }

  const vidCall = async () => {
    console.log(location.state)
    let find = false
    try {
      if (localStorage.getItem('roomId')) {
        const url = `https://halopets.daily.co/${localStorage.getItem('roomId')}`;
        const win = window.open(url, "_blank");
        win.focus();
      } else {
        for (let i of RoomVideo) {
          console.log(i, 'ini dari i')
          if (+location.state === +i.name) {
            find = true
            break
          }
        }
        if (find === true) {
          const url = `https://halopets.daily.co/${location.state}`;
          const win = window.open(url, "_blank");
          win.focus();
        } else {
          const url = 'https://api.daily.co/v1/rooms';
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer becea18a103ea46caf68daad57ed840de8cfadbedc137db19d824b42719b3b63'
            },
            body: JSON.stringify({ name: `${location.state}` })
          };
          localStorage.setItem('roomId', location.state)
          const response = await fetch(url, options)
          const data = await response.json()
          const win = window.open(data.url, "_blank");
          win.focus();
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sections = [
    { title: 'Home', url: '/home' },
    { title: 'Adoption', url: '/adoption' },
    { title: 'My Pet Favorites', url: '/favorites' },
    { title: 'Health Care', url: '/healthcare' },
  ];

  return (
    <Container maxWidth="lg">
      <Header sections={sections} />
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12}>
          <List className={classes.messageArea}>
            {
              chats.map(chat => {
                return (
                  <Box key={chat.timestamp} style={{ width: "100%", display: 'flex', justifyContent: chat.role === 'client' ? 'flex-end' : 'flex-start' }}>
                    <Box style={{ borderRadius: "10px", marginLeft: "20px", marginRight: '1rem', marginTop: '5px', marginBottom: '5px', padding: "10px", display: "inline-block", backgroundColor: chat.role === 'client' ? '#f8f1f1' : '#afebe4' }}>
                      <Grid item xs={12}>
                        <ListItemText align={chat.role === 'client' ? 'right' : 'left'} primary={chat.content}></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText align={chat.role === 'client' ? 'right' : 'left'} secondary={timeConverter(chat.timestamp)}></ListItemText>
                      </Grid>
                    </Box>
                  </Box>
                )
              })
            }
            <div ref={dummy}>

            </div>
          </List>
          <Divider />
          <Grid container style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <Grid item xs={10}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth value={content} onChange={handleChange} multiline rows={1} rowsMax={4} />
            </Grid>
            <Grid xs={1} align="right">
              <Fab aria-label="add" onClick={handleSubmit} style={{ backgroundColor: '#16c79a' }}><SendIcon style={{ color: 'white' }} /></Fab>
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="secondary" aria-label="add" onClick={vidCall} style={{ backgroundColor: '#19456b' }}><VideoCallIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}