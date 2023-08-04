import { Route, Routes } from 'react-router-dom'
import * as pages from './pages'
import { Layout } from './components'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<pages.MainPage />} />
          <Route path='about' element={<pages.AboutPage />} />
          <Route path='*' element={<pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
