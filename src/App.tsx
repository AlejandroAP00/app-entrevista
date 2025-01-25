import './App.css'
import { Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import CreateNote from './pages/CreateNote'

function App() {

  return (
    <Routes>
      <Route path='/notes' element={<Notes/>} />
      
      <Route path='/create-note' element={<CreateNote/>} />
    </Routes>
  )
}

export default App
