import React, {useState, useCallback, useEffect} from 'react'
import _ from "lodash";
import classnames from "classnames";
import "./CountryCapitalGame.css"
export default function CountryCapitalGame({data}) {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [matched, setMatched] = useState(new Set);
    useEffect(()=> {
      const flatOptions = Object.entries(data).flat();
      const randomOptions = _.shuffle(flatOptions);
      setOptions(randomOptions)
    },[data])

    const handleOptionClick = useCallback((e)=> {
      let val = e.target.getAttribute("option-val")
      const newSelection = selectedOption.concat(val);
      if (newSelection.length === 2) {
        const [ first, sec] = newSelection;
        if (data[first] == sec  || data[sec] == first) {
          setCorrectOptions([...newSelection]);
          setTimeout(()=> {
            setMatched(prev => new Set([...prev, ...newSelection]));
            setSelectedOption([]);
            setCorrectOptions([]);
          },1000)
        } else {
          setSelectedOption(newSelection);
          setTimeout(()=> {
            setSelectedOption([]);
          }, 1000)
        }
      } else {
        setSelectedOption(newSelection)
      }
    }, [selectedOption, setSelectedOption,setMatched])
    if (matched.size === options.length) {
      return (
        <div className="listContainer">
          <div>Congratulations</div>
        </div>)
    }
    return (
      <div className="container">
        <div className="game">CountryCapitalGame</div>
        <div className="listContainer">
          {options.map((option)=> {
            if (matched.has(option))
              return;
            let isSelected = selectedOption.includes(option) || correctOptions.includes(option);
            let isCorrect = correctOptions.includes(option);
            let isincorrect = selectedOption.length ==2 && isSelected && !isCorrect;
            return (
              <button  
              className={classnames("btn", isSelected && "selected", isCorrect && "correct", isincorrect && "incorrect")}
              key={option}
              option-val={option}
              onClick= {handleOptionClick}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    )
}
