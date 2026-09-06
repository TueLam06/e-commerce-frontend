import { useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { sender: 'user', text: input }]);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ message: input, history: messages }),
            });

            const data = await res.json();
            setMessages(prev => [...prev, {sender: 'bot', text: data.reply}]);
        } catch (err) {
            console.error(err);
            setMessages(prev =>[...prev, { sender: 'bot', text: 'Xin lỗi, có lỗi xảy ra.' }])
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    return (
        <div>
            <h2>Chat với trợ lý AI</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <b>{msg.sender === 'user' ? 'Bạn' : 'Bot'}:</b>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}
                {loading && (
                    <p><b>Bot:</b> <i>đang suy nghĩ...</i></p>
                )}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Bạn muốn tìm gì?"
            />
            <button onClick={handleSend} disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi"}
            </button>
        </div>
    );
}

export default ChatPage;