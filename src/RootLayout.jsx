import { Outlet } from "react-router-dom";
import React from "react";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
