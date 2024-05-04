import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/Contact.js";
import NavBar from "./components/NavBar/NavBar.js";
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider.js';
function App() {
  return (
    <ThemeProvider>
      <div className="App">

      <BrowserRouter  baseName="/">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
