import React, { useState, useEffect } from "react";
import {Tile} from '../components/Tile/Tile';

export function FrontPage() {
  return (
    <div>
      <h1>Welcome to Join Denmark</h1>
      <Tile state={{title:'Public Sector'}}/>
      <Tile state={{title:'Accommodation'}}/>
      <Tile state={{title:'Job Market'}}/>
      <Tile state={{title:'Culture'}}/>
    </div>
  );
}
