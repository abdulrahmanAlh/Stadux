# Staux

> Staux is a predictable state container for react.js apps.

[![NPM](https://img.shields.io/npm/v/staux.svg)](https://www.npmjs.com/package/staux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# NPM
npm install --save staux
# Yarn
yarn add @reduxjs/toolkit
```

## Purpose

The Staux package creates a store between all parts of the React.js web application.
That store contents: **State** that contains data, **Dispatch** function to edit this state.

## What's Included

Stauxt includes these APIs:

- `configureStore()` : wraps createStore to provide simplified configuration options.
- `CombinGroups()` : Uesd for combine your group reducers.
- `createGroup()` : combines Reducers + Actions. Accepts an object of reducer functions, a group name, and an initial state value, and automatically generates a group reducer with corresponding action creators and action types.

## Usage

Configration file :

```ts
import {
  CombinGroups,
  ConfigureStore,
  TypedUseSelectorHook
} from 'state-any-where'
import productGroup from './groups/planet'

// create store
const groups = CombinGroups({
  reducer: {
    planet: productGroup
  }
})

type RootState = typeof groups

export const { useSelector, dispatch } = ConfigureStore(groups)

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () => dispatch
```

Group file :

```ts
import { MetaResponseAttributs, Planet } from '../models'
import { AppThunk, createGroup, PayloadAction } from 'staux'
import axios from 'axios'

interface InitState {
  isLoading: boolean
  error?: string
  planets: Planet[]
  meta?: MetaResponseAttributs
}

const initialState: InitState = {
  isLoading: false,
  planets: []
}

const productGroup = createGroup({
  initialState,
  name: 'planet',
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
    setPlanets: (state, { payload }: PayloadAction<Planet[]>) => {
      state.planets = payload
    },
    setMeta: (state, { payload }: PayloadAction<MetaResponseAttributs>) => {
      state.meta = payload
    }
  }
})

const { actions } = productGroup

export const { toggleLoading, setError, setPlanets, setMeta } = actions

export const FetchPlanets =
  (page = 1): AppThunk =>
  async ({ dispatch }) => {
    // const dispatch = store.dispatch

    try {
      //Start loading
      dispatch(toggleLoading())

      //check pagnation status
      let getUrl = 'https://swapi.dev/api/planets'

      const res = await axios.get(getUrl, { params: { page } })
      const { results, ...rest } = res.data

      let planets: Planet[] = results

      dispatch(setMeta({ ...rest }))
      dispatch(setPlanets(planets))
    } catch (error) {
      dispatch(setError('Error on fetch planets..'))
    } finally {
      dispatch(toggleLoading())
    }
  }

export default productGroup.reducer
```

UI side :

```tsx
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
```

## License

MIT © [abdulrahmanAlh](https://github.com/abdulrahmanAlh)
