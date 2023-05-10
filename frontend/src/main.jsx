import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./routes/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(Routes);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
