import { getCurrentDate } from '../../utils'
import styles from './styles.module.scss'

export default function Header() {
  const currentDate = getCurrentDate();
  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="Codecast" />

      <p>O melhor podcast dev</p>

      <span>{currentDate}</span>
    </header>
  )
}
