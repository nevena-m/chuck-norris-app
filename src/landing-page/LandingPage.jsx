import React, { useEffect, useState } from "react";
import InlineSearchField from "./InlineSearchField";
import { Link } from "react-router-dom";
import SingleFact, {ChuckNorrisFact} from "../single-fact/SingleFact.jsx";
import PreviousSearches, { loadPreviousSearches, saveSearch } from "./PreviousSearches";
import doApiCall from "../utils/apiCalls";

export default function LandingPage(){

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("test");

    const [previousSearches, setPrevoiusSearches] = useState([]);

    const [searchResults, setSearchResults] = useState(undefined);

    const [randomFact, setRandomFact] = useState(undefined);
    
    useEffect(()=>{
        let searches = loadPreviousSearches()
        setPrevoiusSearches(searches);
        if(searches.length === 0){
            setIsLoading(true);
            doApiCall({
                url: "https://api.chucknorris.io/jokes/random",
                type: "json",
                onOk: (json)=>setRandomFact(new ChuckNorrisFact(json)),
                onError: (errMsg)=>setErrorMsg(errMsg),
                finally: setIsLoading(false)
            })
        }
    }, [])

    const onSubmit = (query) => {
        setErrorMsg(undefined);
        setIsLoading(true);
        saveSearch(query);
        setPrevoiusSearches([...previousSearches, query])
        doApiCall({
            url: `https://api.chucknorris.io/jokes/search?query=${query}`,
            type: "json",
            onOk: (json)=>setSearchResults(json),
            onError: (errMsg) => setErrorMsg(errMsg),
            onFinally: ()=>setIsLoading(false)
        })
    }

    return (
        <>
            <InlineSearchField onSubmit={onSubmit} onChange={()=>errorMsg!== undefined && setErrorMsg(undefined)}/>
            {errorMsg !== undefined && <p className="text-danger">{errorMsg}</p>}
            {isLoading && <p>Search in progress...</p>}
            {previousSearches.length === 0 ?
                <div className="row">
                    <h3>Here's a random fact:</h3>
                    <SingleFact fact={randomFact}/>
                </div>
                :
                <PreviousSearches searches={previousSearches}/>
            }

            {
                searchResults &&
                <div className="mb-3 mx-3 col-xl-7 col-lg-7 col-sm-12 d-inline-flex flex-column">
                    <h3>Search results</h3>
                    <p>Total: {searchResults?.total||0}</p>
                    <div className="d-flex flex-wrap" style={{width: "fit-content"}}>
                        {
                            searchResults?.result?.map(result=>{
                                return (
                                    <div id={result.id} className="d-inline-flex chip flex-column" style={{border: "0.5pt solid #282c34"}} key={result.id}>
                                        <Link to={`/detail/${result.id}`} state={{fact: result}}>{result.value.slice(0, 15)+"..."}</Link>
                                        {result.categories && result.categories.length!==0 && <span className="chip">{result.categories.join(' ')}</span>}
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
            }
        </>
    )
}