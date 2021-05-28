import React from 'react'

import { NotesContextComponent } from './context/NotesContext'

import NotesApp from './components/NotesApp'

import './App.css';

function App() {

  // const editNote = note => {

  //   const notesEdited = notes.map( currentNote => {
  //     if(currentNote.id === note.id)
  //       return note

  //     return currentNote
  //   } )

  //   setNotes( notesEdited )

  // }

  // const deleteNote = noteId => {

  //   let selfLink = notes.find( note => note.id === noteId ).selfLink

  //   fetch(selfLink, {
  //     method: 'DELETE',
  //     headers: {
  //         'Content-Type': 'application/vnd.api+json'
  //     }
  //   })
  //     .then(response => {
        
  //       if(!response.ok)
  //         throw response.json()
          
  //     })
  //     .then(() => setNotes( notes.filter( note => note.id !== noteId ) ))
  //     .catch(async errorPromise => {
  //       const error = await errorPromise
  //       alert(error.errors.detail)
  //     })
  // }

  // useEffect( () => {

  //   const init = {
  //     headers: { "Content-Type": "application/vnd.api+json" } 
  //   }

  //   fetch("http://127.0.0.1:8000/api/v1/notes", init)
  //     .then(response => {
  //       setLoading(false)
  //       return response.json()
  //     })
  //     .then(data => {

  //       if(data?.errors){
  //         throw Error(data.errors.detail)
  //       }
        
  //       setNotesIndexLink(data.links.self)

  //       const notesFetched = data.data.map( note => ({ id: note.id, ...note.attributes, selfLink: note.links.self }))

  //       setNotes(notesFetched)
  //       setNotesToShow(notes)

  //     })
  //     .catch(console.error)

  // }, [])

  return (
      <NotesContextComponent>
        <NotesApp />
      </NotesContextComponent>
  );
}

export default App;
