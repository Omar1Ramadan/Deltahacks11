import { useState } from 'react'
import '../stylesheets/Loan.css'
import { CohereClientV2 } from 'cohere-ai'

const cohere = new CohereClientV2({
  token: '55z3APpnyuA6cokVBDcwYJcQ2VTtlTWJwFAqfvDc',
})

function Loan() {

    const [messages, setMessages] = useState([])

      const [input, setInput] = useState("")
      const [loading, setLoading] = useState(false)

    const formatResponse = (response) => {
        if (!response) return "";
        
        const lines = response.split("\n");
        const formatted = lines.map((line, index) => {
            if (line.match(/^\d+\./)) {
                return <li key={index}>{line}</li>;
            } else if (line.trim() === "") {
                return <br key={index} />;
            } else {
                return <p key={index}>{line}</p>;
            }
        });
        
        return <div>{formatted}</div>;
    }

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");

        setLoading(true);
        try {
            // Convert existing messages to the format Cohere expects
            const messageHistory = messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: typeof msg.text === "string" ? msg.text : msg.text.props.children.map(child => child.props?.children || "").join("\n")
            }));

            const response = await cohere.chat({
                messages: [
                    {
                        role: "system",
                        content: "You are a Loan Estimation Officer AI named Hani who engages in polite, helpful, and inclusive conversations about loan requests.\n\nYour goals:\n\n1. Ask users for clarifying information about their financial needs (e.g., income, assets, how many homes they own).\n2. Provide a confidence rating (0–100) for each loan request. If the confidence is under 50, they cannot receive the loan. This is based off of the user's profile and your\n3. Optionally, offer a revised loan amount if you think it's better suited to the user's situation.\n4. Check eligibility for special loan promotions designed to assist underrepresented communities. If a user's data (tags) suggests they qualify, you must ask at least one clarifying question to confirm.\n\nImportant: Always confirm the user's eligibility with a follow-up question, only if they actually qualify for the promotion. If they have a feature that conflicts with the eligibility of the promotion, do NOT mention it.\n\nPromotions:\n\nFirst-Time Homebuyer Boost\nEligibility: User owns 0 homes (within assets) AND the user is taking out the loan to buy a home.\nBenefit: 0.5% below the standard interest rate\n\nLow-Income Assistance\nEligibility: Salary is UNDER $50,000\nBenefit: 1% interest rate reduction + option for an extended repayment term\n\nMinority-Owned Business\nEligibility: User is a person of colour or another general minority starting or running a business\nBenefit: Higher Loan-to-Value (LTV) ratio (up to 90% instead of 80%)"
                    },
                    ...messageHistory, // Include all previous messages
                    { role: "user", content: input } // Add the new message
                ],
                model: "command-r7b-12-2024",
                temperature: 0.3,
            });
            
            console.log("Full Cohere Response:", JSON.stringify(response, null, 2));
            
            const aiResponse = response.message.content[0].text || "";
            console.log("AI Response before formatting:", aiResponse);
            
            const formattedResponse = formatResponse(aiResponse);
            console.log("Formatted Response:", formattedResponse);

            setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot" }]);

        } catch (error) {
            console.error("Error generating response from Cohere:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Sorry, something went wrong with the AI response.", sender: "bot" },
            ]);
        } finally {
            setLoading(false);
        }
    }


    return(
        <>
        <div className="display-card">
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