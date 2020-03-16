import React from "react";
import "./Search.css";
import {db} from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){
    
    const searchInAccommodation = async (search) => {
        console.log('search: ', search);
        const snapshot = await db.collection('accommodation')
            .where('keywords','array-contains', search.toLowerCase())
            .get();
        const value = snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc = (`
                <tr>
                    <td>${data.headline}</td>
                </tr>`);
        }, '');  
        console.log('Value: ', value);
        return value;
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
                <thead>
                    <tr>
                        <th>Headline</th>
                    </tr>
                </thead>
                <tbody id="rowsSearch"/>
            </table>
        </div>
    );
}