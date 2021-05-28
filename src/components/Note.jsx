import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import ReactMarkdown from 'react-markdown'
import EditNote from './EditNote'

import { NotesContext } from '../context/NotesContext'
import dayjs from 'dayjs'

const Note = ({ note }) => {

    const { id, title, content, created_at } = note
    const { notes, setNotesToShow } = useContext(NotesContext)

    const deleteNote = noteId => {

        let selfLink = notes.find( note => note.id === noteId ).selfLink

        fetch(selfLink, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/vnd.api+json'
            }
        })
        .then(response => {
            
            if(!response.ok)
                throw response.json()
            
        })
        .then(() => setNotesToShow( notes.filter( note => note.id !== noteId ) ))
        .catch(async errorPromise => {
            const error = await errorPromise
            Swal.fire({
                title: error.errors.detail,
                icon: 'error',
                toast: true,
                position: 'top-end'
            })
        })
    }

    const onDelete = () => {

        Swal.fire({
            title: 'Are you sure you want to delete this note?',
            icon: 'warning',
            iconColor: '343A40',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#8412FF',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: () => deleteNote(id),
            allowOutsideClick: () => !Swal.isLoading()
        }).then( result => {
            if(result.isConfirmed){
                Swal.fire({
                    title: 'Deleted!',
                    text: 'You note has been deleted',
                    icon: 'success',
                    confirmButtonColor: '#8412FF'
                })
            }
        })

    }

    return (

        <div className="card shadow border-0">

            <div className="card-header">
                <div className="row">
                    <span className="col-8 col-md-7 col-lg-9">
                        { dayjs(created_at).format("MMM DD, YYYY hh:mm A") }
                    </span>

                    <div className="col-4 col-md-5 col-lg-3 p-0">
                        <div className="d-flex justify-content-around p-0">
                            <EditNote note={ note } />
                            <button className="btn btn-danger btn-sm" onClick={ () => onDelete() }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <div className="card-body rounded shadow-sm">

                <h3 className="text-center">Title: { title }</h3>
                
                <ReactMarkdown>
                    { content }
                </ReactMarkdown>

            </div>
        </div>
    )

}

export default Note