import React, { useState, useEffect } from "react";
import "./SubTilePage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath} from "../Util/Helpers";
import { getContent } from "../services/ContentService";


export function SubTilePage(props) {
    const [title, setTitle] = useState(props.location.state.title);
    const [tileTitles, setTileTitles] = useState({});

    useEffect(() => {
        getContent(title.toLowerCase()).then(setTileTitles);
    }, []);

    function generateTiles(tileTitles) {
        return(
            tileTitles.docs &&
            tileTitles.docs.length > 0 &&
            tileTitles.docs.map(tileTitle => {
                const data = tileTitle.data();
                return (
                    <Link
                        key={data.title}
                        to={{
                        pathname: convertToPath(title + "/" + data.title),
                        state: { title: data.title, picture: data.picture }
                        }}
                    >
                        <Tile
                        state={{ title: data.title, picture: data.picture }}
                        />
                    </Link>
                );
            })
        );
    }

    return (
        <div>
            <NavBar state={{ title: title }}></NavBar>
            <HomeButton />
            <div>
                {/*TODO: Delete <br/> and replace with css*/}
                <br/><br/><br/><br/>
                {generateTiles(tileTitles)}
            </div>
        </div>
    );
}
