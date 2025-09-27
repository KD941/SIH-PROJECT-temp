import React, { useState, useRef, useEffect } from 'react';

const AIAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate thinking
        setTimeout(async () => {
            const thinkingMessage = { sender: 'agent', text: '...' };
            setMessages(prev => [...prev, thinkingMessage]);

            // TODO: Get context from the current page/game
            const context = { game: 'equation-master' };
            const token = localStorage.getItem('glp_auth_token');

            try {
                const response = await fetch('http://127.0.0.1:8000/ai/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ message: input, context })
                });
                const data = await response.json();
                const agentMessage = { sender: 'agent', text: data.reply };

                setMessages(prev => [...prev.slice(0, -1), agentMessage]);
            } catch (error) {
                const errorMessage = { sender: 'agent', text: 'Sorry, I am unable to connect right now.' };
                setMessages(prev => [...prev.slice(0, -1), errorMessage]);
            }
        }, 500);
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/50 animate-bounce">
                    {/* Funny Robot Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 8.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 14a.5.5 0 01-.5-.5V12h1v1.5a.5.5 0 01-.5.5z" clipRule="evenodd" />
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-5 w-80 h-96 bg-dark-800 border border-slate-700 rounded-xl shadow-2xl z-50 flex flex-col animate-fade-in-up">
                    <div className="p-3 bg-dark-700 rounded-t-xl text-center text-white font-bold">
                        AI Helper
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-neon-blue text-white' : 'bg-slate-600 text-white'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="p-2 border-t border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask for a hint..."
                                className="flex-1 px-3 py-2 bg-dark-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white"
                            />
                            <button onClick={handleSend} className="btn btn-primary">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAgent;