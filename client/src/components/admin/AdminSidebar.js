import { faBed, faBuilding, faComment, faHome, faHospitalAlt, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'

const AdminSidebar = () => {

    const { darkMode } = useContext(ThemeContext)

    return (
        <div>
            {/* NAVBAR BOLUMINDE BUTTON GIDIPDIR */}
            <div className="position-sticky pt-3" style={{ height: "calc(100vh - 48px)" }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/admin" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faHome} className="align-text-bottom me-2" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/sos" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faWarning} className="align-text-bottom me-2" />
                            SOS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/categories" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faBuilding} className="align-text-bottom me-2" />
                            Categories
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/welayats" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faBed} className="align-text-bottom me-2" />
                            Welayats
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/users" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faUsers} className="align-text-bottom me-2" />
                            Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/comments" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faComment} className="align-text-bottom me-2" />
                            Comments
                        </NavLink>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>SOS GROUPS</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <NavLink to="/admin/sos-center" className={`nav-link d-flex align-items-center ${darkMode ? "text-white" : "text-dark"}`}>
                            <FontAwesomeIcon icon={faHospitalAlt} className="align-text-bottom me-2" />
                            SOS Center
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar