const initialState = {
  listRooms: [],
  loading: false,
  error: null
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'CHAT/SET_LOADING':
      return { ...state, loading: true }
    case 'CHAT/SET_ERROR':
      return { ...state, error: payload, loading: false }
    case 'CHAT/SET_ROOM':
      return { ...state, error: null, loading: false, listRooms: payload }
    default:
      return state
  }
}

export default reducer