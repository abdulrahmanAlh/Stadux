import React from 'react'
import { FetchPlanets } from './core/groups/planet'
import { useAppDispatch, useAppSelector } from './core/store'

const App = () => {
  const { isLoading, planets } = useAppSelector((state) => state.planet)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(FetchPlanets())
  }
  return (
    <div>
      <button onClick={handleClick}>Test</button>
      {isLoading ? (
        'loading'
      ) : (
        <div style={{ display: 'flex', gap: '10px' }}>
          {planets.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
