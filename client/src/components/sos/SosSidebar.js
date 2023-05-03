import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faCarAlt, faHome, faWarning } from '@fortawesome/free-solid-svg-icons'

const SosSidebar = () => {

    const { darkMode } = useContext(ThemeContext)
    
    return (
        <>
            {/* NAVBAR BOLUMINDE BUTTON GIDIPDIR */}
            <div className="position-sticky pt-3 border-start border-end" style={{ height: "calc(100vh - 48px)" }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/sos" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faHome} className="align-text-bottom me-2" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sos/soses" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faWarning} className="align-text-bottom me-2" />
                            SOS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sos/blogs" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faBook} className="align-text-bottom me-2" />
                            Blog
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sos/notifications" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faBell} className="align-text-bottom me-2" />
                            Notification
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sos/units" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faCarAlt} className="align-text-bottom me-2" />
                            Units
                        </NavLink>
                    </li>
                </ul>   
            </div>
        </>
    )
}

export default SosSidebar