import GaugeChart from "react-gauge-chart";
import { useState } from 'react'
import "../stylesheets/CreditScore.css";
import { useEffect } from "react";

function CreditScore() {

  const [creditScore, setCreditScore] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [usersCredit, setUsersCredit] = useState(null);

  //const userId = 678394888c867f2a6bae24f2; // Replace with the actual user ID
  const minScore = 300;
  const maxScore = 850;

  useEffect(() => {
    // Fetch credit data
    fetch(`/credit/getCreditScore/678394888c867f2a6bae24f2`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch credit data");
        }
        return response.json();
      })
      .then((data) => {
        setCreditData(data.data);
        setCreditScore(data.data?.creditScore || 300); // Use a default score if data is not available
      })
      .catch((error) => {
        console.error("Error fetching credit data:", error);
      });

    // Fetch credit history
    fetch(`/users/getCreditHistory/678394888c867f2a6bae24f2`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch credit history");
        }
        return response.json();
      })
      .then((data) => {
        setUsersCredit(data.data);
      })
      .catch((error) => {
        console.error("Error fetching credit history:", error);
      });
  },[]);

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
          formatTextValue={value => creditScore}
          textColor="white"
          needleColor="#4a90e2"
          hideText={false}
        />
        <p className="creditStatus">Excellent</p>
        <button className="creditBtn">View Your Score</button>
      </div>
    )
}

export default CreditScore;