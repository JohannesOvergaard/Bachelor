import React from "react";
import "./Search.css";
import {db} from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { getStrings} from "./SearchData";

export function Search({setShowSearch}){
    
    const searchInAccommodation = async (search) => {
        const snapshot = await db.collection('accommodation')
            .where('keywords','array-contains', search.toLowerCase())
            .get();
        return snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc.concat(`
                <tr>
                    <td>${data.headline}</td>
                </tr>`);
        }, '');
    }

    const setRows = async (e) => {
        document.getElementById('rowsSearch').innerHTML = 
        await searchInAccommodation(e.target.value)
    }
    
    
    return (
        <div>
            <input 
                className="searchInput" 
                type="text" 
                onChange={(e) => setRows(e)}
            />
            {getStrings()}
            <div className="searchCloseIcon" onClick={() => setShowSearch(false)}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>
            <table>
                <tbody id="rowsSearch"/>
            </table>
        </div>
    );
}