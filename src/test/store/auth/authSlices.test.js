import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"


describe('Pruebas realizadas al authSlice', () => {
  
    test(' debe regresar el estado inicial y llamarse "auth" ', () => {

        const state = authSlice.reducer( initialState, {} )

        expect( authSlice.name ).toBe('auth')
        expect( state ).toEqual( initialState )

    })
    

    test('debe loguearse con los datos del usuario', () => {
      

        const state = authSlice.reducer( initialState, login( demoUser ) )

        expect( state ).toEqual({

            status: 'authenticated',
            uid: '123ALGO',
            email: 'algo@demo.com',
            displayName: 'Mr Algo',
            photoURL: 'https://algo.jpg',
            errorMessage: null

        })
    })
    
    test('debe realizar el logout sin argumentos', () => {
      
        const state = authSlice.reducer( authenticatedState, logout() )

        expect( state ).toEqual( notAuthenticatedState )
    })
    
    test('debe realizar el logout con argumentos', () => {
      

        const errorMessage = 'Error al realizar el logout'

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) )

        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: false,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        } )
    })

    test('debe cambiar el status a checking', () => {

        const state = authSlice.reducer( initialState, checkingCredentials() )
      
        expect( state.status ).toBe( 'checking' )
    })
        

})
