import React from 'react';
import Web3 from 'web3';
import Auction from './contracts/Auction.json';

function PlaceToken() {
    return (
        <div className="place_token">
        <h4 className="placetoken_greeting">Auction your NFT</h4>
        <button className="token">Choose NFT</button>
        <br/>
        <br/>
        <br/>
        <div className="minimum_bid">What is your minimum bid?</div>
        <input type="text" placeholder="Minimum bid"/>
        <button className="enter_min_bid">Enter</button>
        </div>
    )
};

export default PlaceToken
