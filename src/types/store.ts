import { Draft } from 'immer'

/**
 * A store is an object that holds the application's state tree.
 * There should only be a single store in a Redux app, as the composition
 * happens on the reducer level.
 *
 * @template S The type of state held by this store.
 * @template A the type of actions which may be dispatched by this store.
 */
// export interface Store<S = any, A extends Action = AnyAction> {
//   /**
//    * Dispatches an action. It is the only way to trigger a state change.
//    *
//    * The `reducer` function, used to create the store, will be called with the
//    * current state tree and the given `action`. Its return value will be
//    * considered the **next** state of the tree, and the change listeners will
//    * be notified.
//    *
//    * The base implementation only supports plain object actions. If you want
//    * to dispatch a Promise, an Observable, a thunk, or something else, you
//    * need to wrap your store creating function into the corresponding
//    * middleware. For example, see the documentation for the `redux-thunk`
//    * package. Even the middleware will eventually dispatch plain object
//    * actions using this method.
//    *
//    * @param action A plain object representing “what changed”. It is a good
//    *   idea to keep actions serializable so you can record and replay user
//    *   sessions, or use the time travelling `redux-devtools`. An action must
//    *   have a `type` property which may not be `undefined`. It is a good idea
//    *   to use string constants for action types.
//    *
//    * @returns For convenience, the same action object you dispatched.
//    *
//    * Note that, if you use a custom middleware, it may wrap `dispatch()` to
//    * return something else (for example, a Promise you can await).
//    */
//   dispatch: Dispatch<A>

//   /**
//    * Reads the state tree managed by the store.
//    *
//    * @returns The current state tree of your application.
//    */
//   getState(): S
// }

/**
 * A *dispatching function* (or simply *dispatch function*) is a function that
 * accepts an action or an async action; it then may or may not dispatch one
 * or more actions to the store.
 *
 * We must distinguish between dispatching functions in general and the base
 * `dispatch` function provided by the store instance without any middleware.
 *
 * The base dispatch function *always* synchronously sends an action to the
 * store's reducer, along with the previous state returned by the store, to
 * calculate a new state. It expects actions to be plain objects ready to be
 * consumed by the reducer.
 *
 * Middleware wraps the base dispatch function. It allows the dispatch
 * function to handle async actions in addition to actions. Middleware may
 * transform, delay, ignore, or otherwise interpret actions or async actions
 * before passing them to the next middleware.
 *
 * @template A The type of things (actions or otherwise) which may be
 *   dispatched.
 */
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}

/**
 * An *action* is a plain object that represents an intention to change the
 * state. Actions are the only way to get data into the store. Any data,
 * whether from UI events, network callbacks, or other sources such as
 * WebSockets needs to eventually be dispatched as actions.
 *
 * Actions must have a `type` field that indicates the type of action being
 * performed. Types can be defined as constants and imported from another
 * module. It's better to use strings for `type` than Symbols because strings
 * are serializable.
 *
 * Other than `type`, the structure of an action object is really up to you.
 * If you're interested, check out Flux Standard Action for recommendations on
 * how actions should be constructed.
 *
 * @template T the type of the action's `type` tag.
 */
export interface Action<T = any> {
  type: T
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface ConfigureStoreOptions<S = any, A extends Action = AnyAction> {
  /**
   * A single reducer function that will be used as the root reducer, or an
   * object of slice reducers that will be passed to `combineReducers()`.
   */
  reducer: Reducer<S, A> | ReducersMapObject<S, A>
}

/**
 * A *reducer* (also called a *reducing function*) is a function that accepts
 * an accumulation and a value and returns a new accumulation. They are used
 * to reduce a collection of values down to a single value
 *
 * Reducers are not unique to Redux—they are a fundamental concept in
 * functional programming.  Even most non-functional languages, like
 * JavaScript, have a built-in API for reducing. In JavaScript, it's
 * `Array.prototype.reduce()`.
 *
 * In Redux, the accumulated value is the state object, and the values being
 * accumulated are actions. Reducers calculate a new state given the previous
 * state and an action. They must be *pure functions*—functions that return
 * the exact same output for given inputs. They should also be free of
 * side-effects. This is what enables exciting features like hot reloading and
 * time travel.
 *
 * Reducers are the most important concept in Redux.
 *
 * *Do not put API calls into reducers.*
 *
 * @template S The type of state consumed and produced by this reducer.
 * @template A The type of actions the reducer can potentially respond to.
 */
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

/**
 * Object whose values correspond to different reducer functions.
 *
 * @template A The type of actions the reducers can potentially respond to.
 */
export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export type PayloadAction<
  P = any,
  T extends string = string,
  M = never,
  E = never
> = {
  payload: P
  type: T
} & ([M] extends [never]
  ? {}
  : {
      meta: M
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E
      })

export type CaseReducer<S = any, A extends Action = AnyAction> = (
  state: Draft<S>,
  action: A
) => S | void

export interface DispatchParams<S, A extends Action = AnyAction> {
  payloadAction: S
  action: CaseReducer<S, A>
  groupName: string
}

export type SetFunction<State> = (
  op: (store: Store<State>) => Store<State>
) => void
export type GetFunction<State> = () => Store<State>

export type Store<State = any> = {
  state: State
  dispatch: Function
}
