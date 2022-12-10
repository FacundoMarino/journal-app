
export const initialState = {
   
    status: 'checking',
    uid: false,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null

};

export const authenticatedState = {
   
    status: 'authenticated',
    uid: '123ALGO',
    email: 'algo@demo.com',
    displayName: 'Mr Algo',
    photoURL: 'https://algo.jpg',
    errorMessage: null

};


export const notAuthenticatedState = {
   
    status: 'not-authenticated',
    uid: false,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined

};

export const demoUser = {

    uid: '123ALGO',
    email: 'algo@demo.com',
    displayName: 'Mr Algo',
    photoURL: 'https://algo.jpg',
       
}