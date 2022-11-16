import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { setActiveNote } from "../../store/journal/journalSlice"


export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch()
    
    const newTitle = useMemo( () =>{
    return title.length > 17 ?
    title.substrign(0,17) + '...' :
    title;

})


const activeNoteHandler = () =>{ 
        
    dispatch( setActiveNote({ body, title, id, imageUrls, date }) )
}


  return (
    
        <ListItem key={ id } disablePadding>
            <ListItemButton
            onClick={ activeNoteHandler }
            >
                <ListItemIcon>
                </ListItemIcon>
                     <TurnedInNot />
                <Grid 
                container                
                >
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
  )
}