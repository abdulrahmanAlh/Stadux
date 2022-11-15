import { CombinGroups, ConfigureStore } from 'state-any-where'
import productGroup from './groups/planet'
// const planet :Reducer = {}

// create store
const groups = CombinGroups({
  reducer: {
    planet: productGroup
  }
})

// type RootState = typeof groups

export const { useSelector, dispatch } = ConfigureStore(groups)

// export interface TypedUseSelectorHook<TState> {
//   <TSelected>(selector: (state: TState) => TSelected): TSelected;
// }

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
