function setLoading(payload) {
  return {
    type: 'ADOPTIONS/SET_LOADING',
    payload: payload
  }
}

function setLoadingCreate(payload) {
  return {
    type: 'ADOPTIONS/SET_LOADINGCREATE',
    payload: payload
  }
}

function setLoadingDetail(payload) {
  return {
    type: 'ADOPTIONS/SET_LOADINGDETAIL',
    payload: payload
  }
}

function setError(payload) {
  return {
    type: 'ADOPTIONS/SET_ERROR',
    payload: payload
  }
}

function setFetchAdoptions(payload) {
  return {
    type: 'ADOPTIONS/FETCH_ADOPTIONS',
    payload
  }
}

function setCreateAdoption(payload) {
  return {
    type: 'ADOPTIONS/CREATE_ADOPTION',
    payload
  }
}

function setFetchAdoptionDetail(payload) {
  return {
    type: 'ADOPTIONS/FETCH_DETAIL',
    payload
  }
}

function setUpdateAdoption(payload) {
  return {
    type: 'ADOPTIONS/UPDATE_ADOPTION',
    payload
  }
}

function setDeleteAdoption(payload) {
  return {
    type: 'ADOPTIONS/DELETE_ADOPTION',
    payload
  }
}

export function fetchAdoptions() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      console.log(data, '<<< data adoptions di action');
      dispatch(setLoading(false))
      dispatch(setFetchAdoptions(data))
    } catch (err) {
      dispatch(setError(err))
    }
  }
}

export function fetchAdoptionsBySpecies(species) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`http://localhost:3001/adoptions/species/${species}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      console.log(data, '<<< data adoptions by species di action');
      dispatch(setLoading(false))
      dispatch(setFetchAdoptions(data))
    } catch (err) {
      dispatch(setError(err))
    }
  }
}

export function createAdoption(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingCreate(true))
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        body: payload
      })
      
      // if (!response.ok) {
      //   return data
      // } else {
        const data = await response.json()
        dispatch(setLoadingCreate(false))
        dispatch(fetchAdoptions())
        dispatch(setCreateAdoption(data))
        console.log(data, '<<< new adoptions di action');
        return data
      // }
    } catch(err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}

export function fetchDetail(adoptId) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingDetail(true))
      const response = await fetch(`http://localhost:3001/adoptions/${adoptId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      // console.log(data, '<<< data adoption detail di action');
      dispatch(setLoadingDetail(false))
      dispatch(setFetchAdoptionDetail(data))
      return data
    } catch (err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}

export function updateAdoption({payload, id}) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/adoptions/${id}`, {
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        body: payload
      })
      
      const data = await response.json()

      if (!response.ok) {
        return data
      } else {
        dispatch(setUpdateAdoption(data))
        dispatch(fetchAdoptions())
      }

      console.log(data, '<<< update adoptions di action');

    } catch(err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}

export function deleteAdoption(adoptId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/adoptions/${adoptId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
      })
      
      const data = await response.json()

      if (!response.ok) {
        return data
      } else {
        dispatch(setDeleteAdoption(adoptId))
        dispatch(fetchAdoptions())
      }

    } catch(err) {
      console.log(err);
      dispatch(setError(err))
    }
  }
}