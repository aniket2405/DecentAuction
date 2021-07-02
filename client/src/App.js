import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import Auction from './contracts/Auction.json';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import PlaceToken from './PlaceToken';
import BidToken from './BidToken';

function App() {

  

  const [refresh, setrefresh] = useState(0);
  const [currentAccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [auction, setAuction] = useState();

  const loadWeb3 = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. Please install Metamask extension."
      );
    }
  };

   const loadBlockchainData = async () => {
    setLoader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);

    const networkId = await web3.eth.net.getId();

    const networkData = Auction.networks[networkId];
    console.log(networkData);

    if(networkData) {
        const auctions = new web3.eth.Contract(Auction.abi, networkData.address);
        const x = await auctions.methods.activeUsersCount.call();
        console.log(x);
        const y = await auctions.methods;
        console.log(y)
       /*  const ownerId = await auctions.methods.owner.call();
        console.log(ownerId);
        const auctioneerId = await auctions.methods.auctioneer.call();
        console.log(auctioneerId);
        const minimumBid = await auctions.methods.minimumBid.call();
        console.log(minimumBid); */

        console.log(auctions);

        setAuction(auctions);
        setLoader(false);
    } else {
      window.alert("Smart contract is not deployed to current network");
    }
  }

   useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    

    if (refresh === 1) {
      setrefresh(0);
      loadBlockchainData();
    }

   }, [refresh]);

   if(loader) {
     return <div>loading..</div>
   }

  return (
    <Router>
    <div className="App">
    <Switch>
    <Route exact path='/'>
      <Navbar account={currentAccount}/>
      <Home/>
    </Route>
    <Route wxact path='/placetoken'> 
        <Navbar account={currentAccount}/>
        <PlaceToken/>
    </Route>
    <Route exact path='/bidtoken'> 
       <Navbar account={currentAccount}/>
        <BidToken/>
    </Route>
    <Route path='/' render={() => <div>error 404</div>}/>
    </Switch>
    </div>
    </Router>
  );
}


export default App;
