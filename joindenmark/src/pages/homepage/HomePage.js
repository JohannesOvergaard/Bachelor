import React, { useState, useEffect } from "react";
import { getContentFilterBySettings } from "../../services/ContentService";
import { TilesContainer } from "../../components/tilesContainer/TilesContainer";
import { HomePageNavbar } from "../../components/homepagenavbar/HomePageNavBar";
import { useSelector } from "react-redux";

export function HomePage() {
  const [tiles, setTiles] = useState({});
  const settings = useSelector((state) => state.userState.settings);

  const processTiles = async () => {
    const tiles = await getContentFilterBySettings("tile", settings);
    setTiles(tiles);
  };

  useEffect(() => {
    processTiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <div>
      <HomePageNavbar />
      <TilesContainer state={{ tiles: tiles, pathPrefix: "" }}></TilesContainer>
    </div>
  );
}
