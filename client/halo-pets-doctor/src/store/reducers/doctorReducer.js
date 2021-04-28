const initialState = {
  dataDoctor: {},
  loading: false,
  error: null
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'DOCTOR/SET_LOADING':
      return { ...state, loading: payload }
    case 'DOCTOR/SET_ERROR':
      return { ...state, error: payload, loading: false }
    case 'DOCTOR/SET_DATA':
      return { ...state, error: null, loading: false, dataDoctor: payload }
    default:
      return state
  }
}

export default reducer