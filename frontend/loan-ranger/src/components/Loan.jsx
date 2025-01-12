import { useState } from 'react'
import '../stylesheets/Loan.css'

function Loan() {

    const [messages, setMessages] = useState([
        {
          text: "Hi AI Loan Officer, I'd like a $15,000 loan to expand my small bakery. My monthly revenue is about $3,000, and I'd like to invest in new equipment and marketing. Do you think I can get this loan?",
          sender: "user",
        },
        { text: "AI Answers Here...", sender: "bot" },
      ])

      const [input, setInput] = useState("");

      const handleSendMessage = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("")
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: "AI response goes here...", sender: "bot" },
          ])
        }, 1000)
      }
    return(
        <>
        <div className="display-card">
            <h1>Talk to Loan Officer</h1>
            <div className="chat-display">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message-box ${message.sender === "user" ? "user" : "bot"}`}
                >
                    {message.text}
                </div>
                ))}
            </div>
            <div className="input-area">
                <input
                type="text"
                placeholder="Ask The Officer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
        </>
    )
}

export default Loan;