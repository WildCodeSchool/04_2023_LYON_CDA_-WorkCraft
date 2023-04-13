import React from "react";
import Sidebar1 from "../components/Sidebar1";

export default function Root({ children }) {
  return (
    <>
      <Sidebar1 />
      <main>{children}</main>
    </>
  );
}

Root.propTypes = {
  children: React.ReactNode,
};

Root.defaultProps = {
  children: "",
};
