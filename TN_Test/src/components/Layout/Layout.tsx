import { Link, Outlet } from 'react-router-dom'
import style from './Layout.module.scss'

export function Layout() {
  return (
    <>
      <div className={style.pagelayout}>
        <header>
          <Link to='/'>Home</Link> ::
          <Link to='/about'>About</Link> ::
          <Link to='/xcvsdfv'>404</Link>
        </header>

        <main className={style.container}>
          <Outlet />
        </main>

        <footer> (c) 2023</footer>
      </div>
    </>
  )
}
