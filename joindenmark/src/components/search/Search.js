import React from "react";
import "./Search.css";
import {db} from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){
    
    const searchInAccommodation = async (search) => {
        const snapshot = await db.collection('search')
            .where('keywords','array-contains', search.toLowerCase())
            .get();
        return snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc.concat(`
                <tr>
                    <td>${doc.id}</td>
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
            <div className="searchCloseIcon" onClick={() => setShowSearch(false)}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>
            <table>
                <tbody id="rowsSearch"/>
            </table>
        </div>
    );
}