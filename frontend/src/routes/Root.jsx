import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar1 from "../components/Sidebar1";

export default function Root() {
  return (
    <>
      <Sidebar1 />
      <main>
        <Outlet />
      </main>
    </>
  );
}
