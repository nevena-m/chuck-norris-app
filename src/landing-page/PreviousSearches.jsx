import React, { useEffect } from "react";

const previousSearchValues = "PreviousSearches";

export function saveSearch(searchValue){
    let previous = localStorage.getItem(previousSearchValues)
    if(previous != null){
        previous = JSON.parse(previous)
    }
    else{
        previous = []
    }
    if(!previous.includes(searchValue)){
        localStorage.setItem(previousSearchValues, JSON.stringify([searchValue, ...previous].slice(0,10)))
    }
}

export function loadPreviousSearches(){
    let previous = localStorage.getItem(previousSearchValues)
    if(previous == null){
        previous = [];
    }
    else{
        previous = JSON.parse(previous);
    }
    return previous
}

export default function PreviousSearches({searches}){

    useEffect(()=>{}, [searches])

    return (
        <div className="col-sm-12 col-xl-3 col-lg-3 d-inline-flex flex-column">
            <h4 className="text-info">Previous searches</h4>
            <ul className="list-group">
                {searches?.map(s=>{
                    return <li className="list-group-item" key={s}>{s}</li>
                })}
            </ul>
        </div>
    )
}