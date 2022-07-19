import React from "react";
import MainNav from "./Nav/MainNav";
import Footer from "./Footer/Footer";

const Layout = (props) => {
  return (
    <div>
      <MainNav />
      <main className="section-padding">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
