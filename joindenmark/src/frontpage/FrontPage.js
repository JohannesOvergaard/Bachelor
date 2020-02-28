import React, { useState, useEffect } from "react";
import {Tile} from '../components/Tile';

export function FrontPage() {
  return (
    <div>
      <h1>Welcome to Join Denmark</h1>
      <Tile state={{title:'test'}}/>
    </div>
  );
}
