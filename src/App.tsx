import React, { ReactElement } from 'react'
import { HashRouter } from 'react-router-dom'
import Root from './pages/Root'

const App = (): ReactElement => (
  <HashRouter>
    <Root />
  </HashRouter>
)

export default App
