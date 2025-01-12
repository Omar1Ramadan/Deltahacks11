import React from 'react';
import "../stylesheets/Home.css"

function Home() {

    return (
        <div className="home-container">
             <img 
                    src="/hat.png" 
                    alt="Hat" 
                    className="home-hat" 
                />
            <div className="home-banner">
                <h1 className="home-title">Welcome to Loan Ranger</h1>
                <p className="home-subtitle">
                    Your trusted partner for personalized credit checks and loan estimations.
                </p>
            </div>
        </div>
    )
}

export default Home;