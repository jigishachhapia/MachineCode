import React, { useCallback, useState, useRef } from 'react'
import "./InfiniteScroll.css";
import useBookSearch from '../hooks/useBookSearch';
function InfiniteScroll() {
   
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const handleQueryChange = useCallback((e)=> {
        setQuery(e.target.value);
        setPage(1);
    })

    const {books, loading, error, hasMore} = useBookSearch(query, page);
    const observer = useRef();
    const lastBookRef = useCallback((node)=> {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries)=> {
            if(entries[0].isIntersecting && hasMore) {
                setPage(page => page+1);
            }
        })
        if(node)observer.current.observe(node);
    })
  return (

    <div className="pageContainer">
        <div className = "container">
            <input type="text" className="textInput" onChange={handleQueryChange}></input>
           
            {books.map((book,index)=> {
                if (index == books.length-1)
                    return (<div ref = {lastBookRef} key={book}> {book}</div>)
                else
                    return (<div key={book}> {book}</div>)
            })}
            {loading && <div> Loading... </div>}
            {error && <div> error </div> }
        </div>
    </div>
  )
}

export default InfiniteScroll