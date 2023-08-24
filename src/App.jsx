import { useState } from 'react'
import './App.css'
import BeerContainer from './containers/BeerContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BeerContainer />
    </>
  )
}

export default App
