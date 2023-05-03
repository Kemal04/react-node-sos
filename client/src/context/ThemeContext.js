import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {

    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || null
    );

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }   

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider