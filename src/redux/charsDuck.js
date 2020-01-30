import axios from 'axios'
import { updateDB, getFavorites } from '../firebase'

// constant
const initialData = {
  fetching: false,
  characters: [],
  character: {},
  favorites: []
}
const URL = 'https://rickandmortyapi.com/api/character'
const GET_CHARACTERS = 'GET_CHARACTERS'
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'
const REMOVE_CHARACTER = 'REMOVE_CHARACTER'
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
const GET_FAVS = 'GET_FAVS'
const GET_FAVS_SUCCESS= 'GET_FAVS_SUCCESS'
const GET_FAVS_ERROR = 'GET_FAVS_ERROR'


// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload } 
    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, characters: action.payload, fetching: false }
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case REMOVE_CHARACTER:
      return { ...state, characters: action.payload }
    case GET_FAVS:
      return { ...state, fetching: true }
    case GET_FAVS_SUCCESS:
      return { ...state, favorites: action.payload, fetching: false }
    case GET_FAVS_ERROR:
      return { ...state, fetching: false, error: action.payload }
    default:
      return state
  }
}

// actions (thunks)
export const retriveFavorites = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVS
  })
  const { uid } = getState().user
  return getFavorites(uid).then(response => {
    dispatch({
      type: GET_FAVS_SUCCESS,  
      payload: [...response]
    })
  }).catch(error => {
    console.error(error)
    dispatch({
      type: GET_FAVS_ERROR,
      payload: error.message
    })
  })
}

export const addToFavoritesAction = () => (dispatch, getState) => {
  let { characters, favorites }  = getState().characters
  const { uid } = getState().user
  const character = characters.shift()
  favorites.push(character)
  updateDB(favorites, uid)
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { characters: [...characters], favorites: [...favorites] } 
  })

}

export const removeCharacterAction = () => (dispatch, getState) => {
  let { characters } = getState().characters
  characters.shift()
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...characters]
  })
}

export const getCharactersAction = () => (dispatch, _getState) => {
  dispatch({
    type: GET_CHARACTERS
  })
  return axios.get(URL).then(response => {
    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: response.data.results
    })
  }).catch(error => {
    dispatch({
      type: GET_CHARACTERS_ERROR,
      payload: error.response
    })
  })

}