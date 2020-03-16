import React from "react";
import "./Search.css";
import {db} from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){
    const searchInAccommodation = async (search) => {
        const snapshot = await db.collection('accommodation')
            .where('keywords','array-contains', search.toLowerCase())
            .get();
        return snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc.concat(
                <tr>
                    <td>${data.headline}</td>
                    {console.log(data.headline)}
                </tr>);
        }, '');
    }

    const textBoxSearch = document.querySelector('#searchInput');
    const rowsSearch = document.querySelector('#rowsSearch');

    //textBoxSearch.addEventListener('keyup', async (e) =>  await searchInAccommodation(e.target.value.toLowerCase()));
    
    return (
        <div>
            <input className="searchInput" type="text" id="searchInput" onChange={(e) => searchInAccommodation(e.target.value.toLowerCase())}/>
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