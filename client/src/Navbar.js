import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
    <Link to='/'>
      <p className="navbar-brand my-auto">DecentAuction</p>
     </Link> 
      <div className="routers">
      <Link to='/placetoken'>
      <button className="text-black">Place an NFT</button>
      </Link>
      <Link to='/bidtoken'>
      <button className="text-black">Bid for NFT</button>
      </Link>
      </div>
        <li className="nav-item text-white">Your account: {account}</li>
    </nav>
  );
};

export default Navbar;