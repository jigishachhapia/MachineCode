import { useState, useEffect } from "react";
const useIntersectionObserver = (ref, options, loading, cb=()=>{}) => {
    const [intersectionObserverEntry, setIntersectionObserverEntry] = useState(null);

    useEffect(() => {
        if (loading ) return
        if (ref.current && typeof IntersectionObserver === "function") {
            const observer = new IntersectionObserver(entries =>  {
                setIntersectionObserverEntry(entries[0]);
                if (entries[0].isIntersecting && cb instanceof Function) {
                    console.log("setting page");
                    cb();
                }
            } , options);
            observer.observe(ref.current);
            return () => {
                observer.disconnect()
                setIntersectionObserverEntry(null)
            }
        }
        
    },[ref,options,loading])

    return intersectionObserverEntry;
}
export default useIntersectionObserver;