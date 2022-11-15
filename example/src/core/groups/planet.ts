import { createGroup } from 'state-any-where'

interface InitState {
  isLoading: boolean
}

const initialState: InitState = {
  isLoading: false
}

const productGroup = createGroup<InitState>({
  initialState,
  name: 'planet',
  reducers: {
    toggleLoading: (state: InitState) => {
      state.isLoading = !state.isLoading
    }
  }
})

const { actions } = productGroup

export const { toggleLoading } = actions

export default productGroup.reducer
