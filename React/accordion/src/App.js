import './App.css';
import {useState} from "react";
import { AccordionItem } from './Components/AccordionItem/AccordionItem';
const AccordionConfigs = [
  {
    title: "first term ",
    content: "some conditions"
  },
  {
    title: "second term ",
    content: "some conditions"
  },
  {
    title: "third term ",
    content: "some conditions"
  }
]

function App() {

  const [allCheckboxConfig, setAllCheckboxConfig] = useState([...AccordionConfigs.map(a=>false)]);
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
  <div>
     {
      AccordionConfigs.map((accordionItem,index)=> {
          return (
          <AccordionItem config={accordionItem} 
            allCheckboxConfig={allCheckboxConfig} 
            setAllCheckboxConfig={setAllCheckboxConfig} 
            accordionIndex={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}/>
          )
      })
      
     }
     <button type="submit" disabled={allCheckboxConfig.some((checkboxvalue)=> !checkboxvalue)}>Submit</button>
  </div>
  );
}

export default App;
