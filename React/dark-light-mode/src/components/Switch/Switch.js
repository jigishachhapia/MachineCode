import React,{useContext} from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import "./Switch.css"
const Switch = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (    
        <>
        <input type="checkbox" id="check1" onChange={toggleTheme} className="toggle"/>
        <label for="check1">{theme} Mode</label>
        </>
    )
}
export default Switch;