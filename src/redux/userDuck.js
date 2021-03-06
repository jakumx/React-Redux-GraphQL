import { loginWithGoogle, signOutGoogle } from '../firebase'
import { retriveFavorites } from './charsDuck'
// constants
const initialData = {
  loggedIn: false,
  fetching: false
}
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOG_OUT = 'LOG_OUT'

// reducers
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return  {...state, fetching: true, loggedIn: true}
    case LOGIN_SUCCESS:
      return {...state, fetching: false, ...action.payload}
    case LOGIN_ERROR:
      return {...state, fetching: false, error: action.payload}
    case LOG_OUT:
      return { ...initialData }
    default:
      return state
  }
}

// aux
function saveStorage(storage) {
  console.log(storage)
  localStorage.storage = JSON.stringify(storage)
}
// actions (actions/creators)
export const logOutAction = () => (dispatch, _getState) => {
  signOutGoogle()
  dispatch({
    type: LOG_OUT
  })
  localStorage.removeItem('storage')
}

export const restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    })
  }
}


export const doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle().then(user => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        uid : user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }
    })
    saveStorage(getState())
    retriveFavorites()(dispatch, getState)
  }).catch(error => {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.message
    })
  })
}
