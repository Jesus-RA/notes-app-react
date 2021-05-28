import React, { Fragment } from 'react'

export default function Loader({ loading }) {

    const loader = <div className="spinner-grow loader" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>

    return (
        <Fragment>
            {
                loading 
                    ? loader
                    : ''
            }
        </Fragment>
    )
}
