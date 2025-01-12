import GaugeChart from "react-gauge-chart";
import { useState } from 'react'

function CreditScore() {
  const [creditScore] = useState(850)
  const minScore = 300
  const maxScore = 850

  const percent = (creditScore - minScore) / (maxScore - minScore)

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <GaugeChart
          id="credit-score-gauge"
          nrOfLevels={20}
          colors={["#FF0000", "#FF9900", "#00FF00"]}
          arcWidth={0.3}
          percent={percent}
          textColor="transparent"
          needleColor="#000000"
        />
        <h1 className="creditScore">{creditScore}</h1>
        <p className="creditStatus">Good</p>
        <button className="creditBtn">View Your Score</button>
      </div>
    )
}

export default CreditScore;