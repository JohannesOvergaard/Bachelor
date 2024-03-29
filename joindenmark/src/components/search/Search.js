import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import { db } from "../../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { convertToPath } from "../../Util/Helpers";

export function Search({ setShowSearch }) {
  const [searchResults, setSearchResults] = useState([]);

  function addPublicSectorToPath(str) {
    if (
      str === "su" ||
      str === "residencepermit" ||
      str === "taxes" ||
      str === "cpr"
    ) {
      return "publicsector/" + str;
    } else {
      return str;
    }
  }

  const searchContent = async (search) => {
    const snapshot = await db
      .collection("search")
      .where("keywords", "array-contains", search.toLowerCase())
      .get();
    setSearchResults(
      snapshot.docs.reduce(
        (acc, doc) => {
          const collection = doc.data().collection;
          return acc.concat(
            //Hide search when user clicks on search result
            <div key={doc.id} onClick={() => setShowSearch(false)}>
              <Link
                to={{
                  pathname: convertToPath(addPublicSectorToPath(collection)),
                  state: {
                    title: collection,
                    picture: "/images/" + collection + ".jpg",
                  },
                }}
              >
                <p className="searchResultText">{doc.id}</p>
                <div className="searchLinkIcon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </Link>
              <hr />
            </div>
          );
        },
        [<hr key="hr" />]
      )
    );
  };

  return (
    <div>
      <input
        className="searchInput"
        type="text"
        onChange={(e) => searchContent(e.target.value)}
      />
      <div className="searchCloseIcon" onClick={() => setShowSearch(false)}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="searchResultContainer">{searchResults}</div>
    </div>
  );
}
