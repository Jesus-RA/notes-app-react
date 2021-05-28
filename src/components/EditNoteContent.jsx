import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const EditNoteContent = ({ id = 0, content, setContent }) => {

    const [markdownPreview, setMarkdownPreview] = useState(false)

    return (
        <div className="form-group mt-4">
            <div className="d-flex justify-content-between mb-2">

                <label htmlFor={`editNoteContent${id}`}>Note content:</label>

                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="previewMarkdownSwitch"
                        value={ markdownPreview }
                        onChange={ () => setMarkdownPreview(!markdownPreview) }
                    />
                    <label className="form-check-label" for="previewMarkdownSwitch">Preview</label>
                </div>

            </div>
            {
                markdownPreview
                    ? <ReactMarkdown>{ content }</ReactMarkdown>
                    : <textarea
                        name="content"
                        id={`editNoteContent${id}`}
                        rows="10"
                        className="form-control bg-transparent shadow-none"
                        placeholder="Note content..."
                        value={ content }
                        onChange={ e => setContent( e.target.value ) }
                    ></textarea>
            }
        </div>
    )
}

export default EditNoteContent
