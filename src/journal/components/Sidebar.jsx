import { useSelector } from "react-redux"

import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./SideBarItem"

export const Sidebar = ({ draweWidth }) => {

    const { displayName } = useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )


  return (
    <Box
    component='nav'
    sx={{ width: { sm: draweWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
        variant="permanent"
        open
        sx={{
            display: {xs: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: draweWidth }
        }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>

                {
                    notes.map( note => (
                        <SideBarItem key={note.id} { ...note } />
                    ))
                }
            </List>


        </Drawer>


    </Box>
  )
}
