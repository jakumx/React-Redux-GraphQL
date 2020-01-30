import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction, addToFavoritesAction } from '../../redux/charsDuck'

function Home({ characters, addToFavoritesAction, removeCharacterAction }) {

  function renderCharacter() {
    const character = characters[0]
    return (
      <Card
        rightClick={addFav}
        leftClick={nextCharacter}
        {...character}
      />
    )
  }

  function nextCharacter() {
    removeCharacterAction()
  }

  function addFav(){
    addToFavoritesAction()
  } 

  return (
      <div className={styles.container}>
          <h2>Personajes de Rick y Morty</h2>
          <div>
              {renderCharacter()}
          </div>
      </div>
  )
}

function mapState(state) {
  return {
    characters : state.characters.characters
  }
}

export default connect(mapState, { addToFavoritesAction, removeCharacterAction })(Home)