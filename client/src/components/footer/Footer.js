import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faTriangleExclamation, faCircleInfo, faBell, faUser, faHandshakeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    const nowYear = new Date().getFullYear();

    const { t } = useTranslation();
    return (
        <>
            <footer className="d-none d-md-block d-lg-none footer mt-auto py-3 bg-light text-center">
                <div className="container">
                    <span className="text-muted">© {nowYear} "Not Found". {t("footer.1")}</span>
                </div>
            </footer>

            <nav className="mobile-nav d-lg-none d-xl-none d-md-none d-lg-block">
                {/* Iconlar bolmaly asakdakylarda */}
                <NavLink to="/notification">
                    <FontAwesomeIcon icon={faBell} />
                </NavLink>
                <NavLink to="/volunteer">
                    <FontAwesomeIcon icon={faHandshakeAlt} />
                </NavLink>
                <NavLink to="/">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                </NavLink>
                <NavLink to="/instructions">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </NavLink>
                <NavLink to="/login">
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
            </nav>
        </>
    );
};

export default Footer;
