import axios from "axios";
import { useState, useEffect } from "react";
const useFetchPaginated = (query, pageNumber,setPageNumber) => {

    const [loading, setLoading] = useState(false);
    const [data, setData ] = useState([])
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=>{
        setData([]);
        setPageNumber(1);
    },[query])

    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        axios({
            method:"GET",
            url: 'http://openlibrary.org/search.json',
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)

        }).then((res) => {
            setData(prevData => [...new Set([...prevData, ...res.data.docs.map(i => i.title)])])
            setLoading(false);
            setHasMore(res.data.docs.length > 0);
        }).catch((err) => {
            if(axios.isCancel(err)){
                return;
            }
            setError(true);
        })
        return () => cancel();
    },[query, pageNumber])
    
    return [loading, error, data, hasMore];
}
export default useFetchPaginated;