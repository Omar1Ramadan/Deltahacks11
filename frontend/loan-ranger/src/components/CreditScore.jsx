import { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import "../stylesheets/CreditScore.css";

import { calculateCreditScoreFromAPI } from "../credit-check";

function CreditScore() {
    const [creditScore, setCreditScore] = useState(null);
    const userId = "678394888c867f2a6bae24f2"; // Replace with the actual user ID
    const minScore = 300;
    const maxScore = 850;

    useEffect(() => {
        async function fetchAndCalculate() {
            try {
                const score = await calculateCreditScoreFromAPI(userId);
                setCreditScore(score);
            } catch (error) {
                console.error("Error calculating credit score:", error);
            }
        }

        fetchAndCalculate();
    }, [userId]);

    const percent = creditScore !== null ? (creditScore - minScore) / (maxScore - minScore) : 0;

    if (creditScore === null) {
        return <p>Loading credit score...</p>;
    }

    return (
        <div className="credit-container">
            <GaugeChart
                id="credit-score-gauge"
                nrOfLevels={20}
                colors={["#FF0000", "#4a90e2", "#67a7f3"]}
                arcWidth={0.3}
                percent={percent}
                formatTextValue={() => `${creditScore}`}
                textColor="white"
                needleColor="#4a90e2"
                hideText={false}
            />
            <p className="creditStatus">
                {creditScore > 750 ? "Excellent" : creditScore > 650 ? "Good" : "Needs Improvement"}
            </p>
            <button className="creditBtn">View Your Score</button>
        </div>
    );
}

export default CreditScore;
