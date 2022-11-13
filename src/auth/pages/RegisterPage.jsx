import { Link as RouterLink } from 'react-router-dom'
import { Alert, Grid, TextField, Typography, Button, Link } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPasswor } from '../../store/auth/thunks'

const formData = {

  email: 'facundo@google.com',
  password: '123456',
  displayName: 'Facundo marino',

}

const formValidations = {

  email: [ (value) => value.includes('@'), 'El email debe contener un @.' ],
  password: [ (value) => value.length >= 6, 'El password debe tener al menos 6 caracteres.' ],
  displayName: [ (value) => value.length >= 1, 'El campo nombre es necesario.' ],


}

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] )

  const dispatch = useDispatch()
  const [formSubmitted, setformSubmitted] = useState(false);


  const { displayName, email, password, inputHandler, formState, displayNameValid, emailValid, passwordValid, isformValid } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault()
    setformSubmitted(true)

    if( !isformValid ) return;
  
    dispatch(startCreatingUserWithEmailPasswor(formState))
  }

  return (
    
    <AuthLayout title='Register'>


    <form onSubmit={ onSubmit }     className='animate__animated animate__fadeIn animate__faster'
>

      <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 3}}>
            <TextField 
            label="Nombre Completo" 
            type="text" 
            placeholder="Nombre Completo"
            fullWidth
            name='displayName'
            value={ displayName }
            onChange={ inputHandler }
            error={ !!displayNameValid && formSubmitted }
            helperText={ displayNameValid } 
            />
        </Grid>

        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 3}}>
            <TextField 
            label="Correo" 
            type="email" 
            placeholder="correo@google.com.ar"
            fullWidth
            name='email'
            value={ email }
            onChange={ inputHandler }            
            error={ !!emailValid && formSubmitted }
            helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 3}}>
            <TextField 
            label="Contraseña" 
            type="password" 
            placeholder="Contraseña"
            fullWidth
            name='password'
            value={ password }
            onChange={ inputHandler }
            error={ !!passwordValid && formSubmitted  }
            helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >

          <Grid
          display={ !!errorMessage ? '' : 'none' }
          item xs={ 12 } >
              <Alert
              severity='error'
              >
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={ 12 } >
              <Button
              disabled={ isCheckingAuthentication }
              type='submit'
              variant='contained' 
              fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>


            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1, mt: 2}} >¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login' sx={{ mt: 2 }}>
                Ingresar
              </Link>
            </Grid>      

          </Grid>

        </Grid>
    </form>
    </AuthLayout>
  )
}
