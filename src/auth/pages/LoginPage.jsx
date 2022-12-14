import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Alert, Grid, TextField, Typography, Button, Link } from "@mui/material"

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'



const startData = {
  email: '',
  password: '',
}


export const LoginPage = () => {  
  
  const { status, errorMessage } = useSelector( state => state.auth )

  const dispatch = useDispatch();

  const { email, password, inputHandler, formState } = useForm( startData )

const isAuthenticating = useMemo( () => status === 'checking', [status] )

const submitHandler = ( event ) => {

  event.preventDefault();

  dispatch( startLoginWithEmailPassword(formState) )
  

}

const googleSignInHandler = () => {

  dispatch( startGoogleSignIn() )

}

  return (
    
    <AuthLayout title='Login'>


      <form onSubmit={ submitHandler }     className='animate__animated animate__fadeIn animate__faster'
>

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
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >

          <Grid
          display={ !!errorMessage ? '' : 'none' }  
          item xs={ 12 } sm={ 12 }>
            <Alert 
            severity='error'
            >
              { errorMessage }
            </Alert>
          </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
              disabled={ isAuthenticating }
              type='submit' 
              variant='contained'
              fullWidth 
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button               
              disabled= { isAuthenticating }
              variant='contained'
              fullWidth
              onClick={ googleSignInHandler }
              >
                <Google />
                <Typography sx={ {ml: 1} } >Google</Typography>
              </Button>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={ RouterLink } color='inherit' to='/auth/register' sx={{ mt: 2 }}>
                Crear Cuenta
              </Link>

            </Grid>

          </Grid>


        </Grid>
      </form>

      </AuthLayout>
  )
}