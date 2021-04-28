function setLoading(payload) {
  return {
    type: 'USERS/SET_LOADING',
    payload: payload
  }
}

function setError(payload) {
  return {
    type: 'USERS/SET_ERROR',
    payload: payload
  }
}

function successLogin(payload) {
  return {
    type: 'USERS/SUCCESS_LOGIN',
    payload: payload
  }
}

export function register(formRegister) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegister),
      })
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        console.log(data, '<<< data user di action register');
        dispatch(setLoading(false))
      }
    } catch (err) {
      dispatch(setError(err))
    }
  }
}


export function login(formLogin) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formLogin),
      })
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        console.log(data, '<< data login');
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user_id', data.id)
        dispatch(setLoading(false))
        dispatch(successLogin(data))
      }
    } catch (err) {
      dispatch(setError(err))
    }
  }
}