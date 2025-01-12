import { useState } from 'react'
import '../stylesheets/Loan.css'
import { CohereClientV2 } from 'cohere-ai'

const cohere = new CohereClientV2({
  token: 'H2ATvqtoplheCVxMTOFsk14bGrKtsmrUjLg1TcPj',
})

function Loan() {

    const [messages, setMessages] = useState([])

      const [input, setInput] = useState("")
      const [loading, setLoading] = useState(false)

    const formatResponse = (response) => {
        const lines = response.split("\n");
        const formatted = lines.map((line, index) => {

            if (line.match(/^\d+\./)) {
            return <li key={index}>{line}</li>;
            } else if (line.trim() === "") {

            return <br key={index} />
            } else {
            return <p key={index}>{line}</p>
            }
        })
        
        return <div>{formatted}</div>
    }

    const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setLoading(true);
    try {
        const response = await cohere.generate({
        model: "command-r-plus-08-2024", 
        prompt: `User: ${input}\nAI:`,
        max_tokens: 1000, 
        temperature: 0.7, 
        });
        
        console.log("Cohere Response:", response)
        
        const aiResponse = response.generations[0]?.text?.trim()
        const formattedResponse = formatResponse(aiResponse);

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot" }]);

    } catch (error) {
        console.error("Error generating response from Cohere:", error);
        setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong with the AI response.", sender: "bot" },
        ])
    } finally {
        setLoading(false)
    }
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
                {typeof message.text === "string" ? (
                    message.text
                ) : (
                    message.text
                )}
                </div>
            ))}
            {loading && <div className="message-box-bot">AI is typing...</div>}
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