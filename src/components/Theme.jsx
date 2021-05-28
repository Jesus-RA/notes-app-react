import React, { useState, useEffect } from 'react'

const Theme = () => {

    const [darkMode, setDarkMode] = useState(true)

    const setTheme = () => {

        let styles = document.querySelector(':root').style
        if(darkMode){
            styles.setProperty('--dark', '#161B22')
            styles.setProperty('--light', '#FCFAF8')
            styles.setProperty('--card-background', '#343A40')
        }else{
            styles.setProperty('--dark', '#FCFAF8')
            styles.setProperty('--light', '#161B22')
            styles.setProperty('--card-background', '#FCFAF8')
        }

    }

    useEffect( () => {
   
        setTheme()

    }, [darkMode])

    return (
        <div className="form-check form-switch d-flex justify-content-end mb-4">
            <input
                className="form-check-input mx-3"
                type="checkbox"
                id="previewMarkdownSwitch"
                checked={ darkMode }
                onChange={ () => setDarkMode(!darkMode) }
            />
            <label
                className={`form-check-label ${ darkMode ? 'text-white': ''}`}
                for="previewMarkdownSwitch"
            >
                Dark Mode
            </label>
        </div>
    )
}

export default Theme
