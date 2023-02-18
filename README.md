# Staux

> Staux is a predictable state container for react.js apps.

[![NPM](https://img.shields.io/npm/v/staux.svg)](https://www.npmjs.com/package/staux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save staux
```

## Usage

```ts
import { CombinGroups, ConfigureStore, TypedUseSelectorHook } from 'staux'
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
