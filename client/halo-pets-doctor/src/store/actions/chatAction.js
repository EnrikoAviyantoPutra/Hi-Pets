export function setRoom(payload) {
  return ({ type: 'CHAT/SET_ROOM', payload })
}

export function setError(error) {
  return ({ type: 'CHAT/SET_ERROR', payload: error })
}

export function getRoom() {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/chat/doctor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
      const data = await response.json()
      // console.log(data)
      dispatch(setRoom(data))
      return data
    } catch (error) {
      dispatch(setError(error))
    }
  }
}