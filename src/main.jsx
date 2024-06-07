import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './Form'
import Details from './Details'
import ToDo from './ToDo'
import Dashboarding from './Dashboarding'
import CalendarPage from './Pages/CalendarPage'
import KanbanPage from './Pages/KanbanPage'
import ChartsPage from './Pages/ChartsPage'
import Layout from './Layout'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/success" element={<Details />} />
      <Route path="/ToDoList" element={<ToDo />} />
      <Route element={<Layout/>}>
      <Route path="/AdminDashboard" element={<Dashboarding />} />
      <Route path="/calendarPage" element={<CalendarPage />} />
      <Route path="/kanbanPage" element={<KanbanPage/>} />
      <Route path="/chartsPage" element={<ChartsPage/>} />
      </Route>
    </Routes>
  </Router>
)
