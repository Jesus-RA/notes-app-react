import React, { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Alert from '../components/Alert'

const fetchNotes = async (setError, setErrorMessage) => {

    const response = await fetch("http://127.0.0.1:8000/api/v1/notes", {
        headers: {"Content-Type": "application/vnd.api+json"}
    })

    if(!response.ok && response.status !== 406){
        
        setError(true)
        setErrorMessage(response.statusText)

        Swal.fire({
            title: response.statusText,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })

        return []
    }

    const data = await response.json()

    if(data?.errors){

        setError(true)
        setErrorMessage(data.errors.detail)

        Swal.fire({
            title: data.errors.detail,
            icon: 'error',
            toast: true,
            timer: 5000,
            position: 'top-end',
            showConfirmButton: false
        })
        return []
    }

    return data.data.map( note => ({ id: note.id, ...note.attributes, selfLink: note.links.self }))

}

export const NotesContext = createContext()

export function NotesContextComponent({ children }) {

    const [notes, setNotes] = useState([])
    const [notesToShow, setNotesToShow] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let ignore = false

        async function getNotes(){
            const data = await fetchNotes(setError, setErrorMessage)
            if (!ignore){
                setLoading(false)
                setNotes(data)
                setNotesToShow(data)
            }
        }

        getNotes()

        return () => ignore = true
    }, [])

    return (
        <NotesContext.Provider value={ { notes, setNotes, notesToShow, setNotesToShow, error, errorMessage } }>
            { children }
        </NotesContext.Provider>
    )
}
