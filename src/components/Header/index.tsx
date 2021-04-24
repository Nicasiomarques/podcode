import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="Codecast" />

      <p>O melhor podcast dev</p>

      <span>{currentDate}</span>
    </header>
  )
}
