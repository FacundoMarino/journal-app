import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Routes } from "react-router-dom"

import { onAuthStateChanged } from 'firebase/auth'

import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { AuthRoute } from "../auth/routes/AuthRoute"

import { CheckingAuth } from '../uid/components/CheckingAuth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'

export const AppRouter = () => {

  
 const { status } = useSelector( state => state.auth )
 const dispatch = useDispatch()

 useEffect(() => {
  
  onAuthStateChanged( FirebaseAuth, async( user ) => {
    
    if( !user ) dispatch( logout() )

    const { uid, email, displayName, photoURL } = user;
    dispatch( login({ uid, email, displayName, photoURL }) )


  })

 }, []);

 if( status === 'checking' ) return <CheckingAuth />

  return (
   
    <Routes>
        
        {/* Login */}
        <Route path="/auth/*" element={ <AuthRoute /> } />

        {/* Journal */}
        <Route path="/*" element={ <JournalRoutes /> } />

    </Routes>
 
  )
}