import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppNav from "./shared/Navbar.tsx";
import WordGame from "./games/word-game/Word-Game.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
      path: "/word-game",
      Component: WordGame
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
    <AppNav></AppNav>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
