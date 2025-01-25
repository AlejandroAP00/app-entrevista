import './App.css'
import { Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'

function App() {

  return (
    <Routes>
      <Route path='/notes' element={<Notes/>} />
    </Routes>
  )
}

export default App
