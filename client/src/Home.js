import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Auction from './contracts/Auction.json';

function Home() {
    return (
         <section className="mt-20 text-center flex flex-col justify-center items-center">
			<h1 className="text-3xl p-2">NFT Marketplace with SMRA Auction</h1>
			<h2 className="text-xl p-2">by -----</h2>
			<div className="m-4">
				<p>
					You can sell your NFTs and take ownership of other's NFTs in the most justified price 

				</p>
				<p className="m-3">
					Go to -place an nft- to palce your token <br />
					Head over to -bid for nft- to auction for a token
				</p>
			</div>
			<button
				className="py-1 px-4 mx-auto bg-green-400
        text-white font-bold w-max rounded"
			>
				
			</button>
		</section>

    )
}

export default Home
