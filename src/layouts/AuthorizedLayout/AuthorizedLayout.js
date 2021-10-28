import React from "react";

import { Navbar } from "../../components/Navbar/Navbar";

export const AuthorizedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
