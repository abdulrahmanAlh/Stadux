import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export * from './state-managemant'

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Componentt : {text}</div>
}
