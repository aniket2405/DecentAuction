import React from "react";

const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <p className="navbar-brand my-auto">DecentAuction</p>
      <ul className="navbar-nav">
        <li className="nav-item text-white">Your account: {account}</li>
      </ul>
    </nav>
  );
};

export default Navbar;