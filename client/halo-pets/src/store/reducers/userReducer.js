const initialState = {
  userLogin: {},
  loading: false,
  error: null
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'USERS/SET_LOADING':
      return { ...state, loading: payload }
    case 'USERS/SET_ERROR':
      return { ...state, error: payload, loading: false }
    case 'USERS/SUCCESS_LOGIN':
      return { ...state, userLogin: payload, loading: false, error: null }
    default:
      return state
  }
}

export default reducer