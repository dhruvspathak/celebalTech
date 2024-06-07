import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Dashboard, BarChart, CalendarToday, ViewKanban } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './SideBar.css';

const SideBar = ({ toggleSidebar }) => {
  return (
    <div className="sidebar">
      <List className="sidebarList">
        <ListItem button component={Link} to="/AdminDashboard" className="sidebarListItem">
          <ListItemIcon className="sidebarListItemIcon"><Dashboard /></ListItemIcon>
          <ListItemText primary="HOME" />
        </ListItem>
        <ListItem button component={Link} to="/chartsPage" className="sidebarListItem">
          <ListItemIcon className="sidebarListItemIcon"><BarChart /></ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>
        <ListItem button component={Link} to="/calendarPage" className="sidebarListItem">
          <ListItemIcon className="sidebarListItemIcon"><CalendarToday /></ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/kanbanPage" className="sidebarListItem">
          <ListItemIcon className="sidebarListItemIcon"><ViewKanban /></ListItemIcon>
          <ListItemText primary="Kanban Board" />
        </ListItem>
      </List>
      <Button variant="contained" onClick={toggleSidebar} className="sidebarButton">
        Hide Sidebar
      </Button>
    </div>
  );
};

SideBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default SideBar;
