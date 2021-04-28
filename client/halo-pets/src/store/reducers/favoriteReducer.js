const initialState = {
  favorites: [],
  loading: false,
  error: null
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'FAVORITES/SET_LOADING':
      return { ...state, loading: true }
    case 'FAVORITES/SET_ERROR':
      return { ...state, error: payload, loading: false }
    case 'FAVORITES/FETCH_FAVORITES':
      return { ...state, error: null, loading: false, favorites: payload }
    case 'FAVORITES/CREATE_FAVORITE':
      return { ...state, error: null, loading: false, favorites: [ ...state.favorites, payload]}
    case 'FAVORITES/DELETE_FAVORITE':
      return { ...state, error: null, loading: false, favorites: state.favorites.filter(fav => fav.id !== payload) }
    default:
      return state
  }
}

export default reducer