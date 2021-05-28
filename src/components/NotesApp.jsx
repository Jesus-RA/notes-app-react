import React, { useState, useContext } from 'react'

import Loader from './Loader'
import Alert from './Alert'
import AddNote from './AddNote'
import SearchBar from './SearchBar'
import NotesDrawer from './NotesDrawer'
import Theme from './Theme'

import { NotesContext } from '../context/NotesContext'

const NotesApp = () => {

    const { notes, loading, error, errorMessage } = useContext(NotesContext)

    return (
        <div className={`container py-5 ${ loading || error ? 'vh-100' : ''}`}>
            <h1 className="text-center app-title">Manage your notes and write them using Markdown</h1>
            <Theme />
            <div className="row">
                <AddNote />
                <SearchBar />
            </div>

            <div className={`row mt-4 ${loading || error ? 'h-75 align-items-center justify-content-center' : ''}`}>

                { !loading && error && <Alert message={ errorMessage } alert="error" /> }
                <Loader loading={ loading } />
                { 
                    !loading
                    && !error
                    && !notes.length
                    && <Alert message="You don't have notes yet, create the first one." alert="info" />
                }
                {
                    !loading && <NotesDrawer />
                }

            </div>
        </div>
    )
}

export default NotesApp
