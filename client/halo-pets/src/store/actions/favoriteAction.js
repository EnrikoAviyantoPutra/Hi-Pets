function setLoading(payload) {
  return {
    type: 'FAVORITES/SET_LOADING',
    payload: payload
  }
}

function setError(payload) {
  return {
    type: 'FAVORITES/SET_ERROR',
    payload: payload
  }
}

function setFetchFavorites(payload) {
  return {
    type: 'FAVORITES/FETCH_FAVORITES',
    payload
  }
}

function setCreateFavorite(payload) {
  return {
    type: 'FAVORITES/CREATE_FAVORITE',
    payload
  }
}

function setDeleteFavorite(payload) {
  return {
    type: 'FAVORITES/DELETE_FAVORITE',
    payload
  }
}

export function fetchFavorites() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      console.log(data, '<<< data favorites di action');
      dispatch(setLoading(false))
      dispatch(setFetchFavorites(data))
    } catch (err) {
      dispatch(setError(err))
    }
  }
}

export function createFavorite(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify({ adoption_id: payload })
      })
      
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        console.log(data, '<<< new favorites di action');
        dispatch(setCreateFavorite(data))
        dispatch(fetchFavorites())
      }

    } catch(err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}

export function deleteFavorite(id) {
  // console.log(id, '<<< idW di action');
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
      })
      
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        console.log(data, '<<<');
        dispatch(setDeleteFavorite(data))
        dispatch(fetchFavorites())
      }

    } catch(err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}