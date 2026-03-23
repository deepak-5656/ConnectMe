import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader' style={{display:"flex", alignItems:"center", gap:"8px"}}>
                 <img src="/logo.png" alt="logo" style={{width:"55px", height:"45px", borderRadius:"50%"}} />
                    <h2>ConnectMe</h2>
                </div>

                <div className='navlist'>
   <p onClick={() => router("/aljk23")} style={{
    cursor:"pointer",
    padding:"4px 8px",      
    borderRadius:"8px",
    background:"#D97500",
    color:"white",
    fontSize:"0.8rem",     
    margin:0
}}>Guest</p>

<p onClick={() => router("/auth")} style={{
    cursor:"pointer",
    padding:"6px 12px",
    borderRadius:"8px",
    background:"#D97500",  
    color:"white",
    fontSize:"0.9rem",
    margin:0
}}>Register</p>

<div onClick={() => router("/auth")} role='button' style={{
    cursor:"pointer",
    padding:"6px 16px",
    borderRadius:"8px",
    background:"#D97500",        
    fontSize:"0.9rem"
}}>
    <p style={{margin:0, color:"white"}}>Login</p>
</div>
</div>
            </nav>


            <div className="landingMainContainer">

                <div>

                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones 
                    
                    </h1>

                    <p>Cover a distance by ConnectMe</p>

                    <div role='button'>
                        
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>



        </div>
    )
}