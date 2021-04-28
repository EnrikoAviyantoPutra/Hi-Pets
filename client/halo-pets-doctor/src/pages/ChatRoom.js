import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Box,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Container
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from "../store/actions/chatAction";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { db } from "../services/firebase"
import EmptyChat from '../components/EmptyChat';
import EmptyRoom from '../components/EmptyRoom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Header from '../components/Header';
import wiyono from '../assets/dr-wahyudi.jpg'
import budi from '../assets/dr-budi-fix.png'
import cantika from '../assets/dr-cantika-fix.jpg'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '95vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  root: {
    flexGrow: 1
  },
});

const avatars = [
  wiyono,
  budi,
  cantika
]

function timeConverter(UNIX_timestamp) {
  var date = new Date(UNIX_timestamp);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);
  
  return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
}

export default function ChatRoom() {
  const classes = useStyles()
  const [user, setUser] = useState('test-temp-doctor')
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [readError, setreadError] = useState(null)
  const [writeError, setwriteError] = useState(null)
  const [idRoom, setIdRoom] = useState('');
  const dispatch = useDispatch()
  const [room, setRoom] = useState([])
  const [valueSearch, setValueSearch] = useState('');
  const { loading, error } = useSelector(state => ({
    loading: state.doctorReducer.loading,
    error: state.doctorReducer.error
  }))
  const dummy = useRef()

  useEffect(async () => {
    try {
      const data = await dispatch(getRoom())
      if (valueSearch) {
        const filteredData = data.filter(el => el.User.name.toLowerCase().includes(valueSearch.toLowerCase()))
        setRoom(filteredData)
      } else {
        setRoom(data)
      }
    } catch (error) {
      console.log(error, 'ini error');
    }
  }, [dispatch, valueSearch])

  function toChat(id) {
    setIdRoom(id)
  }

  useEffect(() => {
    console.log(idRoom, '<< room id')
    setreadError(null)
    async function fetchMessages() {
      try {
        const roomId = await db.ref("chats")
        roomId.child(`${idRoom}`).on("value", snapshot => {
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
  }, [idRoom]);

  async function handleSubmit(e) {
    e.preventDefault();
    setwriteError(null)
    try {
      const roomId = db.ref("chats")
      await roomId.child(`${idRoom}`).push({
        content,
        timestamp: Date.now(),
        uid: user,
        role: 'doctor'
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

  function toVidCall() {
    const url = `https://halopets.daily.co/${idRoom}`;
    const win = window.open(url, "_blank");
    win.focus();
  }

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setValueSearch(e.target.value);
  }

  console.log(avatars[localStorage.getItem('id') - 1]);

  if (loading) {
    return <Loading />
  }

  if (error || room === undefined) {
    return <Error />
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Avatar
                      src={avatars[localStorage.getItem('id') - 1]}
                    />
                  </ListItemIcon>
                  <ListItemText primary={`Dr. ${localStorage.getItem('name')}`}></ListItemText>
                </ListItem>
              </List>
              <Divider />
              <Grid item xs={12} style={{ padding: '10px' }}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={handleChangeSearch} />
              </Grid>
              <Divider />
              <List>
                {
                  room.length === 0 ? (
                    <EmptyRoom />
                  ) :
                    room.map(el => {
                      return (
                        <ListItem button key={`${el.id}`} onClick={() => toChat(el.id)} style={{ backgroundColor: el.id === idRoom ? '#dadada' : 'white' }}>
                          <ListItemIcon>
                            <Avatar style={{ backgroundColor: '#11698e' }}>{el.User.name.slice(0, 1)}</Avatar>
                          </ListItemIcon>
                          <ListItemText primary={el.User.name}>{el.User.name}</ListItemText>
                        </ListItem>
                      )
                    })
                }
              </List>
            </Grid>
            <Grid item xs={9}>
              {
                !idRoom ? <EmptyChat /> :
                  (
                    <>
                      <List className={classes.messageArea}>
                        {
                          chats.map(chat => {
                            return (
                              <ListItem key={chat.timestamp}>
                                <Grid container>
                                  <Grid item xs={12} style={{ display: 'flex', justifyContent: chat.role === 'client' ? 'flex-start' : 'flex-end' }}>
                                    <Box ref={dummy} style={{ border: "0.5px solid white", borderRadius: "10px", margin: "5px", padding: "10px", display: "inline-block", backgroundColor: chat.role === 'client' ? '#afebe4' : '#f8f1f1' }}>
                                      <ListItemText align={chat.role === 'client' ? 'left' : 'right'} primary={`${chat.content}`} primaryTypographyProps={{ style: { whiteSpace: "normal" } }}></ListItemText>
                                      <ListItemText align={chat.role === 'client' ? 'left' : 'right'} secondary={timeConverter(chat.timestamp)}></ListItemText>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            )
                          })
                        }
                        <div ref={dummy}>
                        </div>
                      </List>
                      <Divider />
                      <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={10}>
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={handleChange} value={content} multiline rows={1} rowsMax={4} />
                        </Grid>
                        <Grid xs={1} align="right">
                          <Fab aria-label="add" onClick={handleSubmit} style={{ backgroundColor: '#16c79a' }}><SendIcon style={{ color: 'white' }} /></Fab>
                        </Grid>
                        <Grid xs={1} align="right">
                          <Fab color="secondary" aria-label="add" onClick={toVidCall} style={{ backgroundColor: '#19456b' }}><VideoCallIcon /></Fab>
                        </Grid>
                      </Grid>
                    </>
                  )
              }
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}