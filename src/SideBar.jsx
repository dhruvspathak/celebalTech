import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { Dashboard, BarChart, CalendarToday, ViewKanban } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
  return (
    <div className="sidebar">
      <List className="sidebarList">
        <ListItem button component={Link} to="/AdminDashboard" className="dashboardButton">
          <ListItemIcon className="sidebarListItemIcon"><Dashboard /></ListItemIcon>
          <ListItemText primary="HOME"/>
        </ListItem>
        <ListItem button component={Link} to="/chartsPage" className="chartButton">
          <ListItemIcon className="sidebarListItemIcon"><BarChart /></ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>
        <ListItem button component={Link} to="/calendarPage" className="calendarButton">
          <ListItemIcon className="sidebarListItemIcon"><CalendarToday /></ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/kanbanPage" className="kanbanButton">
          <ListItemIcon className="sidebarListItemIcon"><ViewKanban /></ListItemIcon>
          <ListItemText primary="Kanban Board" />
        </ListItem>
      </List>
    </div>
  )
}

export default SideBar
