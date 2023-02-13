import {
  CombinGroups,
  ConfigureStore,
  TypedUseSelectorHook
} from 'state-any-where'
import productGroup from './groups/planet'
// const planet :Reducer = {}

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
