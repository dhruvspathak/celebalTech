import { Outlet } from 'react-router-dom'
import MyCalendar from './Calendar'
import { Container, Typography, Grid, Paper } from '@mui/material'
import './Dashboarding.css'
import dashPic from './assets/dashboardSticker.avif'

const Dashboarding = () => {
  return (
    <Container className="container" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        
        {/* Header */}
        <Grid item xs={12}>
          <div className='header'>
            <Typography variant="h4" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="h5">
              Here is your daily briefing:
            </Typography>
          </div>
        </Grid>
        
        {/* Image */}
        <Grid item xs={12} md={4}>
          
          <Paper className="paper">
            <img src={dashPic} alt='dashPic' className="dashPic" />
          </Paper>
        </Grid>

        {/* Boxes */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper className="box box1">
                TOTAL CURRENT USERS
                <Typography variant='h5' className='boxContent'>
                12M
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className="box box2">
                NEW AQUIRED USERS
              <Typography variant='h5' className='boxContent'>
                11k
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className="box box3">
                {`TOTAL HITS (:24hrs)`}
                <Typography variant='h5' className='boxContent'>
                9.7M
              </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Calendar */}
        <Grid item xs={12}>
          <Paper className="calendarSection">
            <Typography variant="h5" className="calendarHeading">
              EVENTS AND PLANNER:
            </Typography>
            <MyCalendar />
          </Paper>
        </Grid>

      </Grid>
      <Outlet />
    </Container>
  )
}

export default Dashboarding
