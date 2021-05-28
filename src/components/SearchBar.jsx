import React, { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

const SearchBar = () => {

    const { notes, notesToShow, setNotesToShow } = useContext(NotesContext)

    const filterNotes = e => {

        const filter = e.target.value

        filter.length === 0
            ? setNotesToShow(notes)
            : setNotesToShow(notesToShow.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()) ))

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