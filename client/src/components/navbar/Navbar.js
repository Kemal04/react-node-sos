import React, {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import {Link, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

const Navbar = () => {
    const {authState, setAuthState} = useContext(AuthContext);

    const {darkMode, toggleDarkMode} = useContext(ThemeContext);

    let currLang = "";
    if (i18next.language === "tm-TM" || i18next.language === "tm") {
        currLang = "TM";
    } else if (i18next.language === "ru-RU" || i18next.language === "ru") {
        currLang = "RU";
    } else if (i18next.language === "en-EN" || i18next.language === "en") {
        currLang = "EN";
    }

    function langHandle(lang) {
        i18next.changeLanguage(lang);
    }
    const darkModeClick = () => {
        toggleDarkMode();
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({phoneNum: "", id: 0, status: false, role: "User"});
    };

    const {t} = useTranslation();

    return (
        <>
            <nav className={`navbar navbar-expand-lg py-0 shadow ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
                <div className="container">
                    {/* LOGO */}
                    <Link to="/" className="navbar-brand ps-2 py-3 text-danger fw-bold">
                        SOS
                    </Link>

                    {/* NAVBAR */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{fontSize: "17px"}}>
                                <NavLink to="/" className="nav-link">
                                    {t("navbar.1")}
                                </NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{fontSize: "17px"}}>
                                <NavLink to="/instructions" className="nav-link">
                                    {t("navbar.2")}
                                </NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{fontSize: "17px"}}>
                                <NavLink to="/volunteer" className="nav-link">
                                    {t("navbar.3")}
                                </NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{fontSize: "17px"}}>
                                <NavLink to="/notification" className="nav-link">
                                    {t("navbar.4")}
                                </NavLink>
                            </li>
                            <li className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0" style={{fontSize: "17px"}}>
                                <div onClick={darkModeClick} className="nav-link border-0" style={{cursor: "pointer"}}>
                                    {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                                </div>
                            </li>
                            <div className="nav-item mx-xl-2 mx-lg-2 mx-md-2 mx-sm-0 mx-0">
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{letterSpacing: "1px"}}>
                                        {currLang === "" ? "RU" : currLang}
                                    </div>
                                    <ul className="dropdown-menu rounded-0">
                                        <li>
                                            <div
                                                className="dropdown-item bg-white text-black"
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    langHandle("tm");
                                                }}
                                            >
                                                TM
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown-item bg-white text-black"
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    langHandle("ru");
                                                }}
                                            >
                                                RU
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown-item bg-white text-black"
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    langHandle("en");
                                                }}
                                            >
                                                EN
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                        <form className="d-flex">
                            {!authState.status ? (
                                <Link to="/login" className="btn btn-danger py-4 fw-bold px-5 rounded-0" style={{letterSpacing: "1px"}} type="submit">
                                    Login
                                </Link>
                            ) : (
                                <div className="navbar-nav ms-5">
                                    <li className="nav-item dropdown">
                                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{letterSpacing: "1px"}}>
                                            Profile
                                        </div>
                                        <ul className="dropdown-menu rounded-0">
                                            {authState.role === "Admin" && (
                                                <li>
                                                    <NavLink to="/admin" className="dropdown-item bg-white text-black">
                                                        Admin
                                                    </NavLink>
                                                </li>
                                            )}
                                            {authState.role === "SOS" && (
                                                <li>
                                                    <NavLink to="/sos" className="dropdown-item bg-white text-black">
                                                        SOS Center
                                                    </NavLink>
                                                </li>
                                            )}
                                            {authState.role === "UNIT" && (
                                                <li>
                                                    <NavLink to="/unit" className="dropdown-item bg-white text-black">
                                                        Unit
                                                    </NavLink>
                                                </li>
                                            )}
                                            {authState.role === "User" && (
                                                <li>
                                                    <NavLink to={`/user-profile`} className="dropdown-item bg-white text-black">
                                                        Profile
                                                    </NavLink>
                                                </li>
                                            )}
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <button onClick={logout} className="dropdown-item bg-white text-black">
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
