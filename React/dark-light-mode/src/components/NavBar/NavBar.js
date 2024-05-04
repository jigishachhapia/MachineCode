import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Switch from "../Switch/Switch.js"
const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Switch/>
        </nav>
    )
}
export default NavBar;