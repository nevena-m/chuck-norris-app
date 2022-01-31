import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export const ChuckNorrisFact = function ({categories, created_at, icon_url, id, updated_at, url, value}) {
    this.categories = categories;
    this.created_at = created_at;
    this.icon_url = icon_url;
    this.id = id;
    this.updated_at = updated_at;
    this.url = url;
    this.value = value;
}

export default function SingleFact({fact}){

    const location = useLocation();

    const [aFact, setFact] = useState(fact);

    useEffect(()=>{
        if(location.state != null){
            setFact(location.state.fact)
        }
    }, [location])

    useEffect(()=>{
        if(fact !== undefined)
            setFact(fact)
    }, [fact])

    return (
        <div className="text-left row my-5">
            {
                aFact ? 
                <>
                    <div className="col-sm-5 col-xl-1 col-l-2 d-flex align-items-center justify-content-center" >
                        <img src={aFact?.icon_url} alt="icon"/>
                    </div>
                    <div className="col-sm-7 col-xl-11 col-l-10 d-flex flex-column">
                        <p style={{fontSize: "2em"}}>{aFact?.value}</p>
                        {
                            aFact?.categories && aFact.categories?.length !== 0 &&
                            <div>
                                <h4>Categories</h4>
                                <div className="chip-wrapper">
                                    {
                                        aFact.categories.map(category =>{
                                            return (
                                                <div className="chip" key={category}>
                                                    {category}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </>
                : <h3>There is nothing to display at the moment. &nbsp;<Link to={"/"}>Go back.</Link></h3>
            }
        </div>
    )
}