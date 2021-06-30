import React from 'react';
import './BidToken.css';
import { Link } from 'react-router-dom';

function BidToken() {
    return (
        <div className="bid_info">
        <h3 className="round_number">Round Number: 1 </h3>
            <br/>
            
            <h3 className="place_bid_info">Place Bid</h3>
            
        <div className="hash_info">
            <input type="value" placeholder="Bid value.."/>
             <button className="generate_hash">Generate Hash</button>
             
             <div className="hash_value">-hash value-</div>
        </div>
        <br/>
        <div className="transaction">
           <input type="text" placeholder="Hash value.."/> 
            <button className="bid_transaction">Transact bid amount</button>
            
            <div className="transaction_result">-tx successful-</div>
        </div>
        
        
        <h3 className="waiting_info">Reveal Bid</h3>
        <div className="waiting_info">Wait for xx seconds before revealing your bid:</div>
        <br/>
         <div className="reveal_bid">
           <input type="text" placeholder="Reveal value.."/> 
            <button className="reveal_bid">Reveal bid amount</button>
            <br/>
            <div className="reveal_result">-Reveal successful-</div>
        </div>
        <div className="user_bid_info">
            --your total bid is xx--
        </div>
        <div className="highest_bid_info">
            --highest bid is xx--
        </div>
        <br/>
        <div className="withdraw">
            <button className="withdraw_btn">Withdraw</button>
            <button className="next_round_btn">Next round</button>
        </div>
        </div>
    )
}

export default BidToken
