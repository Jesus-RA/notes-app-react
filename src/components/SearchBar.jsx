import React, { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import '@sweetalert2/theme-dark'
import Swal from 'sweetalert2/src/sweetalert2.js'

const SearchBar = () => {

    const { notes, notesToShow, setNotesToShow } = useContext(NotesContext)

    const filterNotes = e => {

        const filter = e.target.value

        const resutls = notesToShow.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()) )

        if(!resutls.length)
            Swal.fire({
                title: 'No results founded',
                icon: 'info',
                toast: true,
                timer: 3000,
                position: 'top-end',
                showConfirmButton: false,
            })

        filter.length === 0
            ? setNotesToShow(notes)
            : setNotesToShow(resutls)

    }

    return (
        <div className="form-group col-6 offset-2 col-md-6 offset-md-3">
            <input
                type="text"
                name="search"
                placeholder="Search by title..."
                className="form-control bg-transparent shadow-none border-purple"
                onChange={ e => filterNotes(e) }
            />
        </div>
    )
}

export default SearchBar