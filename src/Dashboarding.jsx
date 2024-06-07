import { Outlet } from 'react-router-dom';
import Chart from './Chart';
import MyCalendar from './Calendar';
import KanbanBoard from './Kanban';
import { Container, Typography, Box } from '@mui/material';
import './Dashboarding.css';

const Dashboarding = () => {
  return (
    <Container className="container">
      <Typography variant="h1" className="header">
        DASHBOARD
      </Typography>
      <Typography variant="h2" className="subHeader">
        Welcome Back!
      </Typography>
      <Box className="chartSection section">
        <Typography variant="h3" className="sectionHeader">
          PROGRESS OF THE PRODUCTS:
        </Typography>
        <Chart />
      </Box>
      <Box className="calendarSection section">
        <Typography variant="h3" className="sectionHeader">
          EVENTS AND PLANNER:
        </Typography>
        <MyCalendar />
      </Box>
      <Box className="kanbanSection section">
        <Typography variant="h3" className="sectionHeader">
          KANBAN BOARD:
        </Typography>
        <KanbanBoard />
      </Box>
      <Outlet />
    </Container>
  );
};

export default Dashboarding;

