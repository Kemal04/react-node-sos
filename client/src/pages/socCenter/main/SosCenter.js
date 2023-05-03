import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { AuthContext } from '../../../context/AuthContext'

const SosCenter = () => {

    const { darkMode } = useContext(ThemeContext)
    const { authState } = useContext(AuthContext);

    return (
        <>
            <div className={`d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ${darkMode ? "text-white" : ""}`}>
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar" className="align-text-bottom"></span>
                        This week
                    </button>
                </div>
            </div>

            <div className='row mt-5 g-0'>
                <div className='col-xl-12'>
                    <div className='card border-0 shadow my-5'>
                        <div className={`card-body p-3 ${darkMode ? "bg-dark-blue text-white" : ""}`}>
                            <div className='row justify-content-center aling-items-center'>
                                <div className='col-xl-12'>
                                    <iframe src={`//maps.google.com/maps?q=${authState.latitude},${authState.longitude}&z=15&output=embed`} style={{ height: "620px", width: "100%" }} title="map" allowFullScreen="" loading="lazy" className="" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SosCenter