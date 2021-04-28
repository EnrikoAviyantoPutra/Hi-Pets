function setDoctor(payload) {
  return ({ type: 'DOCTOR/SET_DATA', payload })
}

function setError(error) {
  return ({ type: 'DOCTOR/SET_ERROR', payload: error })
}

function setLoading(payload) {
  return ({ type: 'DOCTOR/SET_LOADING', payload })
}

export function getDoctor(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/doctors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (!response.ok) {
        dispatch(setLoading(false))
        return data
      } else {
        if (data.name.toLowerCase() === 'wiyono') {
          localStorage.setItem('id', 1)
        } else if (data.name.toLowerCase() === 'budi') {
          localStorage.setItem('id', 2)
        } else if (data.name.toLowerCase() === 'cantika') {
          localStorage.setItem('id', 3)
        }
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        dispatch(setLoading(false))
        dispatch(setDoctor(data))
        return data
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}