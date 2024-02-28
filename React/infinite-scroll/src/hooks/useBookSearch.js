import {useEffect, useState} from 'react'
import axios from "axios";
export default function useBookSearch(query, pageNumber) {
    let cancel;
    const [books, setBooks] = useState([]);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    useEffect (()=> {
        setBooks([]);

    },[query])
    useEffect(()=> {
        setError(false);
        setLoading(true);
        axios({
            method: "GET",
            url: "http://openlibrary.org/search.json",
            params: {q: query, page:pageNumber},
            cancelToken: new axios.CancelToken((c)=> cancel = c)
        }).then(res => {
            setBooks(prevBooks => [...new Set([...prevBooks,...res.data.docs.map((book)=>book.title)])]);
            setHasMore(res.data.docs.length > 0);
            setLoading(false);
        })
        .catch(e=>{
            if (axios.isCancel(e)) return
            setError(true);
        })
        return () => cancel();
    }, [query, pageNumber]);
    return {books, error, loading, hasMore};
}
