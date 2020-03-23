import React, {useState} from "react";
import "./Search.css";
import {db} from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){
    const [searchResults, setSearchResults] = useState([]);
    
    const searchInAccommodation = async (search) => {
        const snapshot = await db.collection('search')
            .where('keywords','array-contains', search.toLowerCase())
            .get();
        setSearchResults(
            snapshot.docs.reduce((acc, doc) => {
                const data = doc.data();
                return acc.concat(
                    <p 
                        key={doc.id} 
                        onClick={() => console.log(data.collection)}
                    >
                        {doc.id}
                    </p>
                );
            }, [])
        );
    }

    return (
        <div>
            <input 
                className="searchInput" 
                type="text" 
                onChange={(e) => searchInAccommodation(e.target.value)}
            />
            <div className="searchCloseIcon" onClick={() => setShowSearch(false)}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>
            {searchResults}
        </div>
    );
}