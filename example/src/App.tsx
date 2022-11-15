import React from 'react'
import { useSelector } from './core/store'

const App = () => {
  const { isLoading } = useSelector((state) => state.planet)
  console.log(isLoading)

  return <div>Test</div>
}

export default App
