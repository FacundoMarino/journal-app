import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components'

import { Button, Grid, TextField, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { setActiveNote, startSaveNote } from '../../store/journal';


export const NoteView = () => {

    const dispatch = useDispatch()
    const { active } = useSelector( state => state.journal )

    const { body, title, date, inputHandler, formState } = useForm( active )

    const dateString = useMemo(() => {
        const newDate = new Date( date )
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch( setActiveNote( formState ) )
    }, [formState]);

    const saveHandler = () => {

        dispatch( startSaveNote() )
    }


  return (
    <Grid 
    className='animate__animated animate__fadeIn animate__faster'
    container
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' > { dateString } </Typography>
        </Grid>
        <Grid item>
            <Button 
            onClick={ saveHandler }
            color="primary"
            sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ inputHandler }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ inputHandler }

            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}