import { useState } from "react";
import { Search } from "react-bootstrap-icons";

export default function InlineSearchField({onSubmit, currentQuery, onChange}){
    
    const [query, setQuery] = useState(currentQuery || "");
    const [errorMsg, setErrorMsg] = useState(undefined);

    const sendValue = ()=>{
        let q = String(query).trim();
        if(q.length === 0){
            setErrorMsg("Input must not be empty!")
            return;
        }
        onSubmit(q)
    }

    return (
        <form onSubmit={(event)=>{
                event.preventDefault();
                event.stopPropagation();
            }}
            className="col-sm-12 col-md-12 col-xl-6 col-lg-6 mx-auto"
        >
            <div className="input-group my-3 has-validation">
                <input type="text" className={`form-control ${errorMsg ? "is-invalid": ""}`} id="query" value={query} placeholder="Insert keyword..."
                    onChange={(event)=>{
                        setQuery(event.currentTarget.value);
                        onChange();
                        if(errorMsg !== undefined){
                            setErrorMsg(undefined)
                        }
                    }}
                />
                <button type="button" onClick={()=>sendValue()} className="btn btn-outline-dark col-sm-2"><Search/></button>
                { errorMsg && 
                    <div className="invalid-feedback">
                        {errorMsg}
                    </div>
                }
            </div>
        </form>
    )
}