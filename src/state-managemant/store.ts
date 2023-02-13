import produce from 'immer'

import { useEffect, useState } from 'react'
import {
  Action,
  AnyAction,
  ConfigureStoreOptions,
  Group,
  GropuAttributes,
  GroupActions,
  Store,
  GetFunction,
  SetFunction,
  DispatchParams
} from '../types'
import { createEmitter } from './utils'

// This state managment works like @redux/toolkit
export let store: Store

export function CreateStore<State>(init: Function) {
  // create an emitter
  const emitter = createEmitter()

  const get: GetFunction<State> = () => store
  const set: SetFunction<State> = (op) => (
    (store = op(store)),
    // notify all subscriptions when the store updates
    emitter.emit(store)
  )
  store = init(set)
  const useStore = () => {
    // intitialize component with latest store
    const [store, setStore] = useState(get())

    // update our local store when the global
    // store updates.
    useEffect(() => {
      emitter.subscribe(setStore)
    }, [])
    return store
  }

  function useSelector<TState = unknown, Selected = unknown>(
    filter?: (state: TState) => Selected
  ): Selected {
    const { state } = useStore()

    return filter ? filter(state as any) : (state as any)
  }

  return { useSelector, useStore, dispatch: store.dispatch }
}

// create dispatch function and state
export function ConfigureStore<State>(state: State) {
  return CreateStore<State>((set: SetFunction<State>) => ({
    state,
    dispatch: <S>(
      param: DispatchParams<S> | ((store: Store<State>) => void)
    ) => {
      if (typeof param === 'object') {
        const { action, payloadAction, groupName } = param
        return produce(set)((store: Store<State>) => {
          store.state[groupName] = produce(action)(store.state[groupName], {
            payload: payloadAction,
            type: action.name
          })
          return {
            state: store.state,
            dispatch: store.dispatch
          }
        })
      } else {
        return param(store)
      }
    }
  }))
}

// Group contents his state...
export function createGroup<State, A = any>(
  attributes: GropuAttributes<State>
): Group<State, A> {
  const actions: GroupActions<State, any> = {}
  Object.keys(attributes.reducers).forEach((key: string) => {
    actions[key] = <P>(payload?: P) => ({
      payloadAction: payload as P,
      action: attributes.reducers[key],
      groupName: attributes.name
    })
  })
  const group: Group<State, A> = {
    actions,
    state: attributes.initialState,
    name: attributes.name,
    reducer: () => attributes.initialState
  }
  return group
}

// Combin all groups to make global state
// export function CombinGroups<S = any, A extends Action = AnyAction>(
//   attributes: ConfigureStoreOptions<S, A>
// ): Store<S, A> {
//   const { reducer } = attributes
//   const state: any = {}
//   // marge states
//   Object.keys(reducer).forEach((key) => {
//     const reducerObj = reducer[key]
//     state[key] = reducerObj.state
//   })
//   return state
// }

// Combin all groups to make global state
export function CombinGroups<S, A extends Action = AnyAction>(
  attributes: ConfigureStoreOptions<S, A>
): S {
  const { reducer } = attributes
  const state: any = {}
  // marge states
  Object.keys(reducer).forEach((key) => {
    const reducerObj = reducer[key]
    state[key] = reducerObj()
  })
  return state
}
