import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {

        savingNote: ( state ) => {
            state.isSaving = true; 
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
        },
        setNotes: (state, action) => {
            
        },
        setSaving: (state) => {
            
        },
        updateNOte: (state, action) => {
            
        },
        deleteNoteById: (state, action) => {
            
        },

    }
});

export const { 
    addNewEmptyNote,
    deleteNoteById,
    savingNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
 } = journalSlice.actions;