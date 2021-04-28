const initialState = {
  adoptions: [],
  adoptionDetail: {},
  loading: false,
  loadingDetail: false,
  loadingCreate: false,
  error: null
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'ADOPTIONS/SET_LOADING':
      return { ...state, loading: payload }
    case 'ADOPTIONS/SET_LOADINGCREATE':
      return { ...state, loadingCreate: payload }
    case 'ADOPTIONS/SET_LOADINGDETAIL':
      return { ...state, loadingDetail: payload }
    case 'ADOPTIONS/SET_ERROR':
      return { ...state, error: payload, loading: false }
    case 'ADOPTIONS/FETCH_ADOPTIONS':
      return { ...state, error: null, loading: false, adoptions: payload }
    case 'ADOPTIONS/FETCH_DETAIL':
      return { ...state, error: null, loading: false, adoptionDetail: payload }
    case 'ADOPTIONS/CREATE_ADOPTION':
      return { ...state, error: null, loadingCreate: false, adoptions: [ ...state.adoptions, payload]}
    case 'ADOPTIONS/UPDATE_ADOPTION':
      return { ...state, error: null, loading: false, adoptions: state.adoptions.map(adopt => adopt.id === payload.id ? payload : adopt)}
    case 'ADOPTIONS/DELETE_ADOPTION':
      return { ...state, error: null, loading: false, adoptions: state.adoptions.filter(adopt => adopt.id !== payload) }
    default:
      return state
  }
}

export default reducer