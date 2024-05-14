import React, { useState,useMemo, useRef, useCallback } from "react";
import useFetchPaginated from "../Hooks/useFetchPaginated";
import useIntersectionObserver from "../Hooks/useIntersectionObserver";

const IntersectionComp = () => {

    const options = useMemo(()=>({
        threshold: 1.0,
        root: null,
        margin: "0px"
    }),[]);
    const ref = useRef(null);
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, error, data, hasMore] = useFetchPaginated(query, pageNumber,setPageNumber);
    const cb = useCallback(()=> {
        if (hasMore) {
            setPageNumber(pageNumber => pageNumber+1);
        }
    }, [hasMore])
    const intersectionObserverEntry = useIntersectionObserver(ref, options,loading,cb);
    const handle = (e) => {
        setQuery(e.target.value);
    }
    return (
        <>
            <input type="text" onChange={handle} value={query}></input>
            {data.map((name, index) => {
                if (index == data.length-1) 
                   return( <div  ref={ref}  key={name}>{name} + "last"</div>)
                else
                    return (<div key={name}>{name}</div>)
            } )}
            {loading? <div>loading ..... </div> : null}
            {error? <div> Error occured {error}</div>: null}
        </>
    )
}
export default IntersectionComp;