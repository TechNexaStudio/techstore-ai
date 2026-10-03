import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! 👋 I'm the TechStore AI assistant. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
  const text = message.trim();

  if (!text) return;

  setMessages((prev) => [
    ...prev,
    {
      type: "user",
      text: text,
    },
  ]);

  setMessage("");

  try {
    console.log("Sending message to server:", text);
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: "Sorry, I couldn't connect to the AI assistant.",
      },
    ]);
  }
};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <span>TechStore AI</span>
        </div>

        <button className="nav-button">Start Conversation</button>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="badge">✦ AI-Powered Customer Support</span>

          <h1>
            Support your customers
            <span> smarter and faster.</span>
          </h1>

          <p>
            An intelligent AI customer support assistant that answers
            questions, provides instant help, and captures valuable leads
            for your business.
          </p>

          <div className="hero-actions">
            <button className="primary-button">Chat with AI</button>
            <button className="secondary-button">Explore Features</button>
          </div>

          <div className="trust-row">
            <div>
              <strong>24/7</strong>
              <span>Available</span>
            </div>

            <div>
              <strong>Instant</strong>
              <span>Responses</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Powered</span>
            </div>
          </div>
        </div>

        <div className="chat-preview">
          <div className="chat-header">
            <div className="assistant-info">
              <div className="assistant-avatar"></div>

              <div>
                <strong>TechStore Assistant</strong>
                <span>
                  <i></i> Online now
                </span>
              </div>
            </div>

            <span className="menu">•••</span>
          </div>

          <div className="chat-body">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`message ${item.type}`}
              >
                {item.text}
              </div>
            ))}

            <div className="suggestions">
              <button onClick={() => setMessage("Tell me about your products")}>
                Product information
              </button>

              <button onClick={() => setMessage("I need help with my order")}>
                Order support
              </button>
            </div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;