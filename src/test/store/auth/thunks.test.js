import { loginWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../../store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../firebase/providers')

describe('Pruebas en authTunks', () => {
    
const dispatch = jest.fn();

beforeEach( () => jest.clearAllMocks() );
    
    test('Tiene que invocar el checkingCredential', async() => {
    
    await checkingAuthentication()( dispatch )

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

    });

    test('startGoogleSigIn debe llamar checkingCredentials y login', async() => {
      
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });
    
    
    test('startGoogleSigIn debe llamar checkingCredentials y logout', async() => {
      
        const loginData = { ok: false, errorMessage: 'Error en google'};

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    }) 
    

    
});
