import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import { lightGreen } from '@mui/material/colors'
import { Typography } from '@mui/material'
import './Layout.css'

const Layout = () => {
  const [sidebar, setSidebar] = useState(false)

  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <div className='layout'>
      <AppBar className='toolBar'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
            Dashboard
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar sx={{ bgcolor: lightGreen[500], width: 48, height: 48 }}>D</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      {sidebar && <SideBar />}
      <div className={`mainContent ${!sidebar ? 'collapsed' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
