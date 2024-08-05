import React, {useState} from "react";
import  "./AccordionItem.css";
export const AccordionItem = ({config,allCheckboxConfig,setAllCheckboxConfig,accordionIndex, activeIndex,setActiveIndex}) => {
    return (
        <div onClick={(e)=> {
            if (accordionIndex===activeIndex) {
                setActiveIndex(-1);
            }else {
                setActiveIndex(accordionIndex);
            }
        }}>
            <div className="header">
                <input type="checkbox" 
                    checked={allCheckboxConfig[accordionIndex]} 
                    onClick={(e)=> {
                        e.stopPropagation()
                        setAllCheckboxConfig(prevVals => {
                        return prevVals.map((checkboxVal,idx) => idx===accordionIndex ? e.target.checked : checkboxVal)
                        })
                    }}>
                    </input>
                <span>{config.title}</span>
            </div>
            <div>
                {
                    activeIndex === accordionIndex ? 
                     <>
                     <div className="content">
                        <p>{config.content}</p>
                     </div>
                     
                     </> : <></>
                }
            </div>
        </div>   
    )
}