import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './Form'
import Details from './Details'
import ToDo from './ToDo'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/success" element={<Details />} />
      <Route path= "/ToDoList" element={<ToDo/>} />
    </Routes>
  </Router>
)
