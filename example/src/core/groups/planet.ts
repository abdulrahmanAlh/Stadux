import { MetaResponseAttributs, Planet } from '../models'
import { AppThunk, createGroup, PayloadAction } from 'state-any-where'
import axios from 'axios'
// import { dispatch } from '../store'

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
