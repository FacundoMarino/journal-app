import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savePhotosToActiveNote, savingNote, setActiveNote, setNotes, setSaving, updateNote  } from "./journalSlice";

export const startNewNote = () => {

    return async( dispatch, getState ) => {
    
    dispatch( savingNote() )

    const { uid } = getState().auth;
        

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        const setDocResp = await setDoc( newDoc, newNote)

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
    } 
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) =>{

    const { uid } = getState().auth;
    
    if( !uid ) throw new Error('El UID del usuario no existe');

    const respNotes = await loadNotes( uid );

    dispatch( setNotes( respNotes ) )
    }
}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

    dispatch( setSaving() )

    const { uid } = getState().auth;
    const { active } = getState().journal

    const noteFireStore = { ...active }
    delete noteFireStore.id

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ active.id }` )
    await setDoc( docRef, noteFireStore, { merge: true} )

    dispatch( updateNote( active ) )

    }
}

export const startUploadFiles = ( files = [] ) => {

    return async ( dispatch ) => {

        dispatch( setSaving() );

        const fileUploadPromises = [];
        for ( const file of files ){
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises )
        dispatch( savePhotosToActiveNote( photosUrls ) )
    }
}

export const startDeletingNote = () => {

    return async( dispatch, getState) => {
        const { uid } = getState().auth
        const { active } = getState().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ active.id }` )
        const resp = await deleteDoc( docRef )

        dispatch( deleteNoteById( active.id ) )
    } 

}