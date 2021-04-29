import Link from 'next/link'

import { currentDate } from '../../utils'
import styles from './styles.module.scss'


export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <img
          style={{ cursor: 'pointer' }}
          src="/logo.svg"
          alt="Codecast"
        />
      </Link>

      <p>O melhor podcast dev</p>

      <span>{currentDate}</span>
    </header>
  )
}
