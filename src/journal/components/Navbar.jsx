import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { Grid, AppBar, IconButton, Toolbar, Typography } from "@mui/material"


export const Navbar = ({ draweWidth }) => {
  return (
    <AppBar
        position='fixed'
        sx={{ 
          width: { sm: ` calc(100% - ${ draweWidth }px)` },
          ml: { sm: `${ draweWidth }px)` }
         }}
    >
        <Toolbar>
            <IconButton
            color='inherit'
            edge='start'
            sx={{ mr: 2, display: { sm: 'none' } }}

            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center        '>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton color='error'>
                    <LogoutOutlined />
                </IconButton>


            </Grid> 

        </Toolbar>
    </AppBar>
  )
}
