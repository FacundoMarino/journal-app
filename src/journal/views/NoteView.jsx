import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { setActiveNote, startSaveNote } from '../../store/journal';
import { startDeletingNote, startUploadFiles } from '../../store/journal/thunks'


export const NoteView = () => {

    const dispatch = useDispatch()
    const { active, messageSaved, isSaving } = useSelector( state => state.journal )

    const { body, title, date, inputHandler, formState } = useForm( active )

    const fileInputRef = useRef()

    const dateString = useMemo(() => {
        const newDate = new Date( date )
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch( setActiveNote( formState ) )
    }, [formState]);
    
    useEffect(() => {
        if( messageSaved.length > 0){
            Swal.fire('Nota ha sido actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const saveHandler = () => {

        dispatch( startSaveNote() )
    }

    
    const inputFileHandler = ({ target }) => {

        if( target.files === 0 ) return;

        dispatch( startUploadFiles( target.files ) )
    }

    const deleteHandler = () => {

        dispatch( startDeletingNote() )  
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

            <input
                type='file'
                multiple
                ref={ fileInputRef }    
                onChange={ inputFileHandler }
                style={{ display: 'none' }}
            
            />


            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
                >
                <UploadOutlined />
            </IconButton>


            <Button 
            disabled={ isSaving }
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

        <Grid container justifyContent='end'>
            <Button
            onClick={ deleteHandler }
            sx={{ mt: 2}}
            color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery images={ active.imageUrls }  />

    </Grid>
  )
}