import { CaseReducer, PayloadAction, Reducer } from './store'

export interface GropuAttributes<S> {
  reducers: { [K: string]: CaseReducer<S, PayloadAction<any>> }
  initialState: S
  name: string
}
export interface GroupActions<S> {
  [K: string]: <P>(payload?: P) => {
    payloadAction: P
    action: CaseReducer<S, PayloadAction<P>>
    groupName: string
  }
}

export interface Group<S> {
  actions: GroupActions<S>
  //    Record<
  //     string,
  //     (payload?: any) => {
  //       payloadAction: any
  //       action: CaseReducer<S, PayloadAction<any>>
  //       groupName: string
  //     }
  //   >
  state: S
  reducer: Reducer<S>
  name: string
}

// export interface CombindGroupsAttriburs<S> {
//   reducer: { [K in keyof S]: Group<S[K]> }
// }
