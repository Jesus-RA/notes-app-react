import React, { Fragment, useState, useRef, useEffect, useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import EditNoteContent from './EditNoteContent'
import '@sweetalert2/theme-dark'
import Swal from 'sweetalert2/src/sweetalert2.js'

const EditNote = ({ note }) => {

    const { id, title, content, selfLink } = note
    const [titleEdited, setTitleEdited] = useState(title)
    const [contentEdited, setContentEdited] = useState(content)
    const focusRef = useRef(null)
    const { notes, setNotesToShow } = useContext(NotesContext)

    useEffect(() => {
        focusRef.current.focus()
    }, [])

    const onSaveChanges = () => {
        
        const data = {
            data: {
                type: 'notes',
                id: id,
                attributes: {
                    title: titleEdited,
                    content: contentEdited
                }
            }
        }

        fetch(selfLink, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/vnd.api+json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {

                const noteEdited = { id, ...data.data.attributes, selfLink: data.data.links.self }
                
                const notesEdited = notes.map( currentNote => {
                    if(currentNote.id === noteEdited.id)
                        return noteEdited
                
                    return currentNote
                } )
            
                setNotesToShow( notesEdited )

                Swal.fire({
                    title: 'Note updated',
                    icon: 'success',
                    toast: true,
                    timer: 5000,
                    position: 'top-end',
                    showConfirmButton: false
                })

            })
            .catch(error => console.error(error))

    }

    return (
        <Fragment>

            <button
                type="button"
                className="btn btn-warning btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#editNote${id}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>

            <div className="modal fade" id={`editNote${id}`} aria-labelledby="AddNotemodal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">

                        <div className="modal-header justify-content-end p-3 border-0">
                            <button
                                className="btn btn-danger btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#editNote${id}`}
                            >x</button>
                        </div>

                        <div className="modal-body">
                            
                            <div className="form-group">
                                <label htmlFor="editNoteTitle" className="mb-2">Note title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    id={`editNoteTitle${id}`}
                                    placeholder="Note title"
                                    className="form-control bg-transparent shadow-none"
                                    ref={ focusRef }
                                    value={ titleEdited }
                                    onChange={ e => setTitleEdited( e.target.value ) }
                                />
                            </div>

                            <EditNoteContent content={ contentEdited } setContent={ setContentEdited } />

                        </div>

                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-purple w-100"
                                data-bs-toggle="modal"
                                data-bs-target={`#editNote${id}`}
                                onClick={ onSaveChanges }
                            >Save changes</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditNote