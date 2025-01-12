import GaugeChart from "react-gauge-chart";
import { useState } from 'react'
import "../stylesheets/CreditScore.css";

function CreditScore() {
  const [creditScore] = useState(850)
  const minScore = 300
  const maxScore = 850

  const percent = (creditScore - minScore) / (maxScore - minScore)

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