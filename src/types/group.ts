import { CaseReducer, PayloadAction, Reducer } from './store'

export interface GropuAttributes<S> {
  reducers: { [K: string]: CaseReducer<S, PayloadAction<any>> }
  initialState: S
  name: string
}
export type GroupActions<S, A = any> = {
  [K in keyof A]: <P>(payload?: P) => {
    payloadAction: P
    action: CaseReducer<S, PayloadAction<P>>
    groupName: string
  }
}

export interface Group<S, A> {
  actions: GroupActions<S, A>
  //    Record<
  //     string,
  //     (payload?: any) => {
  //       payloadAction: any
  //       action: CaseReducer<S, PayloadAction<any>>
  //       groupName: string
  //     }
  //   >
  state: {
    [Property in keyof S]: S[Property]
  }
  reducer: Reducer<this['state']>
  name: string
}

// export interface CombindGroupsAttriburs<S> {
//   reducer: { [K in keyof S]: Group<S[K]> }
// }
