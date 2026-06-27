import { useState } from 'react'
import '../styles/App.css'
import '../styles/Cabecalho.css'
import '../styles/Corpo.css'
import Cabecalho from './Cabecalho'
import Corpo from './Corpo'

function App() {

  return (
    <main>
      <Cabecalho />
      <Corpo />
    </main>
  )
}

export default App
