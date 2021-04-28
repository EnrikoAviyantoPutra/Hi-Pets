import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import axios from 'axios'
import AppBar from '../components/AppBar'
import Header from '../components/Header'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Container
} from '@material-ui/core'
import Loading from '../components/Loading'

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Adoption', url: '/adoption' },
  { title: 'My Pet Favorites', url: '/favorites' },
  { title: 'Health Care', url: '/healthcare' },
];


export default function TesMidtrans(){
  const [snapToken, setSnapToken] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.userReducer.userLogin)
  const price = 20000
  const location = useLocation()

  const history = useHistory()
  const [open, setOpen] = useState(false)

  function handleMainOpen(isOpen) {
    setOpen(isOpen)
  }

  useEffect(() => {
    console.log('masuk use effect')
    setLoading(true)
    console.log(location.state, '<<< state di midtrans')
    axios({
      method: 'GET',
      url: `http://localhost:3001/midtrans/${user.name}/${price}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .then(({data}) => {
      console.log(data, '<<< data midtrans return')
      setSnapToken(data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err.response)
      setLoading(false)
    })
  }, [user, price, location.state])

  function formatRupiah(price){
    return price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
  }

  function handleOnClick(e){
    e.preventDefault()
    window.snap.pay(snapToken, {
    onSuccess: function(result){console.log('success', result);history.push({pathname: '/chat', state: location.state});},
    onPending: function(result){console.log('pending', result); history.push({pathname: '/chat', state: location.state});},
    onError: function(result){console.log('error', result );history.push('/home');},
    onClose: function(){console.log('customer closed the popup without finishing the payment');}
  })
  }
  if(loading){
    return <Loading />
  }
  return (
      <Container maxWidth="lg">
      <Header title="Payment" sections={sections}/>
        <Card style={{top: '30%', left: '30%', position: 'fixed', width: '40%', padding: 10}} raised={true}>
          <CardContent>
            <Typography variant="h5">Purchase Summary</Typography>
            <hr/>
            <List>
              <ListItemText><b>Customer Name:</b> {user.name} </ListItemText>
              <ListItemText><b>Total Purchase:</b> {formatRupiah(price)}</ListItemText>
            </List>
          </CardContent>
          <CardActions>
          <FormControl>
            <Button variant="contained" onClick={handleOnClick} style={{ backgroundColor: '#54bba3', color: 'white' }}>Proceed to Payment</Button>
          </FormControl>
          </CardActions>       
          <div id="snapjs">
            <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js"
              data-client-key="SB-Mid-client-GrffCMN7wG9DYfV6"></script>
          </div>
        </Card>
        </Container>
  )
}



