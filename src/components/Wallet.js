import React from 'react';
import { useEffect,useState } from 'react';

//metamask connection
//connect to smart contract
//display todo
//set todo




const Wallet = () => {
    const [walletAddress,setWalletAddress] = useState("");
    
    
    useEffect(()=>{console.log("checking")},[])

    async function requestAccount(){
    
        if(window.ethereum){
            console.log("metamask detedcted")
            try {
                const accounts = await window.ethereum.request({method:"eth_requestAccounts",})
                console.log("accounts",accounts)
                setWalletAddress(accounts[0])
            } catch (error) {
                console.log("error",error)
                
            }
        }else{
            console.log("metamask not found")
        }
    }
  return (
    <div>
        <h3>Connected wallet address:{walletAddress}</h3>
    <button onClick={()=>{requestAccount()}}>Connect Wallet</button></div>
  )
}

export default Wallet