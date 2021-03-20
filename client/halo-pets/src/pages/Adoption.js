import React,  { useEffect, useState } from 'react'
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  ListSubheader,
  Snackbar,
  Typography,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '../components/AppBar'
import DrawerHeader from '../components/DrawerHeader'
import useStyles from '../helpers/style'
import useStylesAdoption from '../helpers/styleAdoption'
import CardBarTile from '../components/CardBarTile';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdoptions,
  createAdoption,
  fetchDetail,
  updateAdoption,
  deleteAdoption
} from '../store/actions/adoptionAction';
import ModalFormAdopt from '../components/ModalFormAdopt';
import MuiAlert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AdoptionPage() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const styles = useStylesAdoption();
  const [open, setOpen] = useState(false);
  const handleMainOpen = (isOpen) => {
    setOpen(isOpen)
  }
  const [openModalForm, setOpenModalForm] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorForm, setErrorForm] = useState('');
  const [fileName, setFileName] = useState('');
  const [formIndex, setFormIndex] = useState('');
  const [formAdopt, setFormAdopt] = useState({
    name: '',
    species: '',
    gender: '',
    dob: '',
    image_url: []
  });

  const { adoptions, loading, error } = useSelector(state => ({
    adoptions: state.adoptionReducer.adoptions,
    loading: state.adoptionReducer.loading,
    error: state.adoptionReducer.error
  }))

  const handleOpenModalForm = () => {
    setOpenModalForm(true);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setFormIndex('');
  };

  function convertDate(d) {
    d = new Date(d);
    return [d.getFullYear(), d.getMonth()+1, d.getDate()]
        .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
  }

  const handleEditAdopt = async (adoptId) => {
    // setAdoptId(adoptId);
    try {
      setFormIndex(adoptId);
      const adoptionDetail = await dispatch(fetchDetail(adoptId))
      await setFormAdopt({
        name: adoptionDetail.name,
        species: adoptionDetail.species,
        gender: adoptionDetail.gender,
        dob: convertDate(adoptionDetail.dob),
        image_url: [adoptionDetail.image_url]
      });

      setFileName(adoptionDetail.image_url.split('/').pop().slice(13))

      handleOpenModalForm();
    } catch (err) {
      console.log(err);
    }
    
  }

  useEffect(() => {
    dispatch(fetchAdoptions())
  }, [dispatch])

  const handleModalAdd = () => {
    setFormAdopt({
      name: '',
      species: '',
      gender: '',
      dob: convertDate(new Date()),
      image_url: []
    });
    setFileName('')
    handleOpenModalForm();
  }

  const handleChangeForm = (event) => {
    let { name, value, files } = event.target;
    // console.log(event.target.files[0]);
    if (files) {
      setFormAdopt((prev) => ({ ...prev, image_url: files[0] }));
      setFileName(files[0].name)
    } else {
      setFormAdopt((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let errMsg;

    const formData = new FormData()
    formData.set('name', formAdopt.name)
    formData.set('species', formAdopt.species)
    formData.set('gender', formAdopt.gender)
    formData.set('dob', formAdopt.dob)
    formData.append('image_url', formAdopt.image_url)

    const payload = formData

    console.log(formAdopt);
    if (!formIndex) {
      try {
        const returnedResp = await dispatch(createAdoption(payload))

        if (Object.keys(returnedResp)[0] === 'msg') {
          let temp = ''
          returnedResp.msg.forEach((el, idx) => {
            if (idx < returnedResp.msg.length - 1) {
              temp += `${el}, `
            } else {
              temp += el
            }
          })
          errMsg = temp
          setErrorForm(errMsg)
          setOpenSnackbar(true)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const returnedResp = await dispatch(updateAdoption({ payload, id: formIndex }))

        if (Object.keys(returnedResp)[0] === 'msg') {
          let temp = ''
          returnedResp.msg.forEach((el, idx) => {
            if (idx < returnedResp.msg.length - 1) {
              temp += `${el}, `
            } else {
              temp += el
            }
          })
          errMsg = temp
          setErrorForm(errMsg)
          setOpenSnackbar(true)
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!errMsg) {
      handleCloseModalForm();
    }
  }

  const handleDeleteAdopt = (adoptId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#24a944',
      cancelButtonColor: '#dc3546',
      confirmButtonText: 'Yes, delete it!'
    })
      .then(result => {
        if (result.value) {
          dispatch(deleteAdoption(adoptId))
          Swal.fire('Deleted!', 'Your pet data for adoption has been deleted.', 'success')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your pet data for adoption is safe!',
            'error'
          )
        }
      })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className={classes.root}>
      <AppBar handleMainOpen={handleMainOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
      <DrawerHeader/>
      <Card className={styles.rootCard}>
        <CardContent>
          <Typography variant="h5">Filter Pet</Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Card className={styles.cardPetSpecies}>
              <CardContent>
                <Button variant="contained" color="secondary">All</Button>
              </CardContent>
            </Card>
            <Card className={styles.cardPetSpecies}>
              <CardContent>
                <Button variant="contained" color="primary">Dog</Button>
              </CardContent>
            </Card>
            <Card className={styles.cardPetSpecies}>
              <CardContent>
                <Button variant="contained" color="secondary">Cat</Button>
              </CardContent>
            </Card>
          </Grid>
          </CardContent>
      </Card>
      <GridList cellHeight={400} cols={4} className={styles.gridList} spacing={20}>
        <GridListTile key="Subheader-adoption" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div">
            <Button
              variant="contained"
              color="secondary"
              className={styles.button}
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleModalAdd}
            >
              Add Pet
            </Button>
          </ListSubheader>
        </GridListTile>
        {
          adoptions.map(pet => (
            <GridListTile className={styles.gridListTile} key={pet.id}>
              <img src={pet.image_url} alt={pet.name} />
              <CardBarTile
                pet={pet}
                handleEditAdopt={handleEditAdopt}
                handleDeleteAdopt={handleDeleteAdopt}
              />
            </GridListTile>
          ))
        }
      </GridList>
        <ModalFormAdopt
          title={formIndex ? 'Edit Pet' : 'Add New Pet'}
          open={openModalForm}
          formAdopt={formAdopt}
          handleCloseModalForm={handleCloseModalForm}
          handleChangeForm={handleChangeForm}
          handleSubmitForm={handleSubmitForm}
          fileName={fileName}
        />
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorForm}
          </Alert>
        </Snackbar>
      </main>
    </div>
  )
}