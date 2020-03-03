import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

export function FrontPage() {
  const dataFromDB = db.collection("tile").get();
  const [tiles, setTiles] = useState([]) ;
  
  function convertToPath(title){
    return "/" + title.replace(/ /g,'').toLowerCase()
  }
  
  function makeTiles(){
    dataFromDB.then(function(querySnapshot) {
      const arr = [];
      querySnapshot.forEach(function(doc) {
        arr.push(
          <Link key={doc.data().title}
            to={{
              pathname: convertToPath(doc.data().title),
              state: { title: doc.data().title, picture: doc.data().picture }
            }}
          >
            <Tile
              state={{ title: doc.data().title, picture: doc.data().picture }}
            />
        </Link>);
      });
      setTiles(arr);
    });
  }

  useEffect(() => {
    makeTiles();
  },[]);

  return (    
    <div>
      <h1>Join Denmark - step by step</h1>
      {console.log(tiles)}
      {tiles}
    </div>
  );
}
