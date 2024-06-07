import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Button from '@mui/material/Button'

const Layout = () => {
  const [sidebar, setSidebar] = useState(true)
  
  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <div style={{ display: "flex" }}>
      {sidebar && <SideBar toggleSidebar={toggleSidebar} />}
      <div style={{ flex: 1, padding: "16px" }}>
        {!sidebar && (
          <Button variant="contained" onClick={toggleSidebar}>
            Show Sidebar
          </Button>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
