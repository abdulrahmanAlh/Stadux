# state-any-where

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/state-any-where.svg)](https://www.npmjs.com/package/state-any-where) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save stadux
```

## Usage

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

## License

MIT © [abdulrahmanAlh](https://github.com/abdulrahmanAlh)
