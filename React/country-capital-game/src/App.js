import React, {useEffect, useState} from 'react';
import {DATA} from "./constants"
import CountryCapitalGame from "./components/CountryCapitalGame";
function App() {

  const [data,setData] = useState({});
  useEffect (() => {
    // fetch('./data.json')
    // .then((response) => response.json())
    // .then((json) => console.log(json));
    setData(DATA);
  },[])
  return (
    <div className="App">
     <CountryCapitalGame data={data}/>
    </div>
  );
}

export default App;
