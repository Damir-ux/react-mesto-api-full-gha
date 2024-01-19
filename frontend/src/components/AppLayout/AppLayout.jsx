import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

function AppLayout({ email, isOpen, onHamburgerClick, onLogOut }) {
  return (
    <>
      <Header email={email} isOpen={isOpen} onLogOut={onLogOut} />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
