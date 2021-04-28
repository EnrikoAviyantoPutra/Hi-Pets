import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  GridListTileBar,
  IconButton,
  Tooltip
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  actionBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
    opacity: 0.8
  },
  iconIsFav: {
    color: '#f50057',
    opacity: 0.8
  }
}));

export default function CardBarTile({ favorites, pet, handleEditAdopt, handleDeleteAdopt, handleDetailAdopt, handleAddFavorite, handleRemoveFavorite }) {
  const history = useHistory();

  const classes = useStyles();

  const age = Number(new Date().getFullYear()) - Number(pet.dob.slice(0, 4));

  const isFav = favorites.find(fav => fav.adoption_id === pet.id)

  return (
    <>
      <GridListTileBar
        title={pet.name}
        subtitle={<span>Age: {age < 1 ? `< 1` : `${age}`} years</span>}
        actionIcon={
          <Tooltip title="See detail">
            <IconButton aria-label={`info about Mimi`} className={classes.icon} onClick={() => handleDetailAdopt(pet.id)}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        }
        actionPosition="right"
      />
        <GridListTileBar
          title=""
          titlePosition="top"
          actionIcon={
            <>
            {
              pet.user_id != localStorage.getItem('user_id') ? <div></div> :
              history.location.pathname === '/favorites' ? <div></div> : (
                <>
                <Tooltip title="Edit Pet">
                  <IconButton aria-label="edit" className={classes.icon} onClick={() => handleEditAdopt(pet.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Pet">
                  <IconButton aria-label="delete" className={classes.icon} onClick={() => handleDeleteAdopt(pet.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                </>
              )
            }
            {
              !isFav ? (
                <Tooltip title="Add to Favorites">
                  <IconButton aria-label="Add To favorites" className={classes.icon} onClick={() => handleAddFavorite(pet.id)}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Remove Favorite">
                  <IconButton aria-label="Remove Favorite" className={classes.iconIsFav} onClick={() => handleRemoveFavorite(pet.id)}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            </>
          }
          actionPosition="right"
          className={classes.actionBar}
        />
    </>
  )
}