import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Container,
  Grid,
  GridList,
  GridListTile,
  Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavorite, fetchFavorites } from '../store/actions/favoriteAction';
import Loading from '../components/Loading';
import Error from '../components/Error';
import CardBarTile from '../components/CardBarTile';
import useStylesAdoption from '../helpers/styleAdoption';
import { fetchDetail } from '../store/actions/adoptionAction';
import ModalDetailAdopt from '../components/ModalDetailAdopt';
import Header from '../components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import gridUseStyles from '../helpers/gridStyles'
import ModalLoading from '../components/ModalLoading';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Adoption', url: '/adoption' },
  { title: 'My Pet Favorites', url: '/favorites' },
  { title: 'Health Care', url: '/healthcare' },
];

export default function FavoritesPage() {
  const styles = useStylesAdoption();
  const gridClasses = gridUseStyles();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [petDetail, setPetDetail] = useState({});

  const dispatch = useDispatch()
  const { favorites, loading, error } = useSelector(state => ({
    favorites: state.favoriteReducer.favorites,
    loading: state.favoriteReducer.loading,
    error: state.favoriteReducer.error
  }));

  const { loadingDetail } = useSelector(state => ({
    loadingDetail: state.adoptionReducer.loadingDetail,
  }))

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  }

  const handleDetailAdopt = async (adoptId) => {
    setOpenModalDetail(true)
    try {
      const adoptionDetail = await dispatch(fetchDetail(adoptId))
      await setPetDetail(adoptionDetail)
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveFavorite = (adoptId) => {
    const isFav = favorites.find(fav => fav.adoption_id === adoptId);
    dispatch(deleteFavorite(isFav.id))
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="My Pet Favorites" sections={sections} />
        <main>
          <Card className={gridClasses.rootCard} style={{ minHeight: '60vh' }}>
            <CardContent>
              <Grid container className={gridClasses.root} spacing={4} justify="center">
                <GridList cellHeight={300} cols={4} spacing={20} style={{ marginTop: '2rem', paddingLeft: 2 }} className={styles.gridList}>
                  <GridListTile key="Subheader-adoption" cols={4} style={{ height: 'auto' }}>
                    <Typography variant="h5" style={{ textAlign: 'center', color: '#113461' }}><b>My Pet Favorites</b></Typography>
                  </GridListTile>
                  {
                    favorites.map(fav => (
                      <GridListTile className={styles.gridListTile} key={fav.id} style={{ minWidth: 300, maxHeight: 300 }} cols={1}>
                        <img src={fav.Adoption.image_url} alt={fav.Adoption.name} />
                        <CardBarTile
                          favorites={favorites}
                          pet={fav.Adoption}
                          handleDetailAdopt={handleDetailAdopt}
                          handleRemoveFavorite={handleRemoveFavorite}
                        />
                      </GridListTile>
                    ))
                  }
                </GridList>
                {
                  Object.keys(petDetail).length === 0 || loadingDetail ? (
                    <ModalLoading
                      open={openModalDetail}
                      handleCloseModalDetail={handleCloseModalDetail}
                    />
                  ) :
                    (
                      <ModalDetailAdopt
                        open={openModalDetail}
                        pet={petDetail}
                        handleCloseModalDetail={handleCloseModalDetail}
                      />
                    )
                }
              </Grid>
            </CardContent>
          </Card>
        </main>
      </Container>
    </React.Fragment>
  );
}