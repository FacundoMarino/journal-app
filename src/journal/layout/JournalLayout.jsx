import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "../components";


const draweWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
   <Box sx={{ display: 'flex' }}>

    {/* navbar */}

    <Navbar draweWidth={ draweWidth } />
    {/* sidebar */}

    <Sidebar draweWidth={draweWidth} />


    <Box
    component='main'
    sx={{ flexGrow: 1, p: 3 }}
    >
    {/* Toolbar */}
    <Toolbar />

    { children }

    </Box>

   </Box>
  )
}
