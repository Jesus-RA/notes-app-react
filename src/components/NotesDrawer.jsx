import React, { Fragment, useState, useContext, useEffect } from 'react'
import { NotesContext } from '../context/NotesContext'

import Note from './Note'

const NotesDrawer = () => {

    const { notesToShow } = useContext(NotesContext)

    return (
        <Fragment>
        {
            notesToShow.map( (note) => (
                <div className="col-md-4 mb-4" key={note.id}>
                  <Note note={note} />
                </div>
            ))
        }
        </Fragment>
    )
}

export default NotesDrawer