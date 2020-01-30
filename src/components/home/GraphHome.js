import React, {useEffect, useState} from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

export default function GrapHome() {
  const [chars, setChars] = useState([])
  const query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `
  const { data, loading, error } = useQuery(query)

  useEffect(() => {
    if (data && !loading && !error) {
      setChars([...data.characters.results])
    } 
  }, [data])

  function nextCharacter() {
    chars.shift()
    setChars([...chars])
  }

  if (loading) return <h2>Cargando...</h2>

  return (
    <Card
      // rightClick={addFav}
      leftClick={nextCharacter}
      {...chars[0]}
    />
    )
}