import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import WordGame from "./games/word-game/Word-Game";

const client = generateClient<Schema>();

function App() {

  return (
    <main>
      <WordGame></WordGame>
    </main>
  );
}

export default App;
