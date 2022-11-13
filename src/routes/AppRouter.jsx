import { Navigate, Route, Routes } from "react-router-dom"

import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { AuthRoute } from "../auth/routes/AuthRoute"

import { CheckingAuth } from '../uid/components/CheckingAuth'
import { useCheckAuth } from "../hooks"

export const AppRouter = () => {

  const { status } = useCheckAuth()
 

 if( status === 'checking' ) return <CheckingAuth />

  return (
   
    <Routes>


      {
        ( status === 'authenticated')
        ? <Route path="/*" element={ <JournalRoutes /> } />
        : <Route path="/auth/*" element={ <AuthRoute /> } /> 
      }       

      <Route path="/*" element={ <Navigate to='/auth/login' /> } />

    </Routes>
 
  )
}