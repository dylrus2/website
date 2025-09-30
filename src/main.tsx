import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WordGame from "./games/word-game/Word-Game.tsx";
import ApollonianGasket from "./math/apollonianGasket/ApollonianGasket.tsx";
import Navbar from "./shared/navigation/navbar/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/word-game",
    Component: WordGame
  },
  {
    path: "/gasket",
    Component: ApollonianGasket
  }

])
// import { Amplify } from "aws-amplify";
// import outputs from "../amplify_outputs.json";

// Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
      integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
      crossOrigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    <div style={{width: '100%', height: '100%' }}>
      <Navbar></Navbar>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);