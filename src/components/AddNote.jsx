import React, { Fragment, useState, useRef, useEffect, useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import EditNoteContent from './EditNoteContent'
import Swal from 'sweetalert2/src/sweetalert2.js'

const AddNote = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const focusRef = useRef(null)

    const { notes, setNotesToShow } = useContext(NotesContext)

    useEffect( () => focusRef.current.focus() , [])

    const onAddNote = () => {

        const noteData = {
            data: {
                type: "notes",
                attributes: {
                    title,
                    content
                }
            }
        }

        fetch("https://notes-api-app.herokuapp.com/api/v1/notes", {
            method: 'POST',
            headers: { 'Content-Type': 'application/vnd.api+json' },
            body: JSON.stringify(noteData)
        })
            .then( response => response.json() )
            .then( data => {

                const newNote = { 
                    id: data.data.id,
                    ...data.data.attributes,
                    selfLink: data.data.links.self
                }

                setNotesToShow([ ...notes, newNote ])

                setTitle('')
                setContent('')

                Swal.fire({
                    title: 'Note added',
                    icon: 'success',
                    toast: true,
                    timer: 5000,
                    position: 'top-end',
                    showConfirmButton: false
                })

            })
            .catch(console.error)

    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-purple col-4 col-md-3"
                data-bs-toggle="modal"
                data-bs-target="#addNote"
            >
                Add new note
            </button>

            <div className="modal fade" id="addNote" aria-labelledby="AddNotemodal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">

                        <div className="modal-header justify-content-end p-3 border-0">
                            <button
                                className="btn btn-danger btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#addNote"
                            >x</button>
                        </div>

                        <div className="modal-body">
                            
                            <div className="form-group">
                                <label htmlFor="title">Note title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Note title"
                                    className="form-control bg-transparent shadow-none"
                                    ref={ focusRef }
                                    value={ title }
                                    onChange={ e => setTitle( e.target.value ) }
                                />
                            </div>

                            <EditNoteContent
                                content={ content }
                                setContent={ setContent }
                            />

                        </div>

                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-purple w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#addNote"
                                onClick={ onAddNote }
                            >Add note</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddNote