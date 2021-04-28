export function setDoctor(payload) {
  return ({ type: 'DOCTOR/SET_DOCTOR', payload })
}

export function setError(error) {
  return ({ type: 'DOCTOR/SET_ERROR', payload: error })
}

export function setLoading(payload) {
  return ({ type: 'DOCTOR/SET_LOADING', payload })
}

export function getDoctor() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      dispatch(setLoading(false))
      dispatch(setDoctor(data))
    } catch (error) {
      dispatch(setError(error))
    }
  }
}