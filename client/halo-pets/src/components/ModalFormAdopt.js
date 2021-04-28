import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: 600,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
  },
  rootForm: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

function convertDate(d) {
  d = new Date(d);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
}

export default function ModalFormAdopt({ title, open, formAdopt, handleCloseModalForm, handleChangeForm, handleSubmitForm, fileName }) {
  const classes = useStyles();

  const { loadingCreate } = useSelector(state => ({
    loadingCreate: state.adoptionReducer.loadingCreate
  }))
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!loadingCreate) {
      setSuccess(false);
    } else {
      setSuccess(true);
    }
  };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleCloseModalForm}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card className={classes.root}>
          <CardHeader
            title={title}
          />
          <CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid container item xs={12}>
              <form className={classes.rootForm}>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <TextField
                    name="name"
                    value={formAdopt.name}
                    label="Name"
                    color="secondary"
                    onChange={handleChangeForm}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <InputLabel required>Species</InputLabel>
                  <Select
                    name="species"
                    value={formAdopt.species}
                    onChange={handleChangeForm}
                    className={classes.textField}
                    required
                  >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <InputLabel required>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formAdopt.gender}
                    onChange={handleChangeForm}
                    className={classes.textField}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <InputLabel required>Date of Birth</InputLabel>
                  <TextField
                    id="date"
                    // label="Date of Birth"
                    type="date"
                    defaultValue={formAdopt.dob}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="dob"
                    onChange={handleChangeForm}
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <TextField
                    name="description"
                    value={formAdopt.description}
                    label="Description"
                    variant="outlined"
                    color="secondary"
                    rows="7"
                    onChange={handleChangeForm}
                    multiline
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <CameraAltIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        value={fileName}
                      />
                    </Grid>
                    <Grid item>
                      <label htmlFor="upload-photo" style={{ marginBottom: 2 }} >
                        <input
                          style={{ display: 'none' }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          accept="image/*"
                          onChange={handleChangeForm}
                          className={classes.textField}
                        />

                        <Button
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                          color="primary"
                          variant="contained"
                        >
                          Upload Photo
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row" justify="flex-end" style={{ marginTop: 32 }}>
          <div className={classes.wrapper}>
            <Button variant="contained" color="secondary" onClick={(e) => { handleButtonClick(e); handleSubmitForm(e);}} style={{ marginRight: 8 }} className={buttonClassname} disabled={loadingCreate}>
              Save
            </Button>
            {loadingCreate && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
            <Button onClick={handleCloseModalForm}>
              Cancel
            </Button>
          </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  )
}