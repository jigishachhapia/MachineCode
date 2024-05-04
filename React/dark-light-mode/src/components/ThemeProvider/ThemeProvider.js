import React, {createContext,useState, useEffect} from "react";

const ThemeContext = createContext({theme: "light", toggleTheme:()=> {}});
const ThemeProvider = ({children}) => {
    const [ theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    useEffect(()=> {
        document.documentElement.setAttribute("data-theme", theme);
    },[theme])
    return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
    )

}

export {ThemeContext, ThemeProvider}