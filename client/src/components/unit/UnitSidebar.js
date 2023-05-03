import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWarning } from '@fortawesome/free-solid-svg-icons'

const UnitSidebar = () => {

    const { darkMode } = useContext(ThemeContext)

    return (
        <>
            {/* NAVBAR BOLUMINDE BUTTON GIDIPDIR */}
            <div className="position-sticky pt-3 border-end border-start" style={{ height: "calc(100vh - 48px)" }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/unit" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faHome} className="align-text-bottom me-2" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/unit/soses" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faWarning} className="align-text-bottom me-2" />
                            SOS
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UnitSidebar