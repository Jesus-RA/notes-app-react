import React from 'react'

const Alert = ({ message, alert }) => {

    const alerts = {
        info: 'alert-info',
        error: 'alert-danger',
        success: 'alert-success'
    }

    const alertStyle = alerts[alert]

    return (
        <div
            className={`alert ${alertStyle} text-center col-md-8 mx-auto`}
        >
            { message }              
        </div>
    )
}

export default Alert
