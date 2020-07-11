import Header from "./Header";
import Footer from "./Footer";
import React from "react";

export const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
export default Layout;
