import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoMdSend, IoMdChatboxes, IoMdClose } from "react-icons/io";
import { Transition } from "@headlessui/react";
import ChatMessage from "./ChatMessage";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your NGO assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting to the server.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}{" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform-gpu hover:scale-110"
      >
        <div className="relative">
          {isOpen ? <IoMdClose size={24} /> : <IoMdChatboxes size={24} />}
          {/* {!isOpen && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          )} */}
        </div>
      </button>
      {/* Chat Window */}{" "}
      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-y-4 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition-transform duration-300"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-4 opacity-0"
        className="fixed bottom-24 right-4 z-50 transform-gpu"
      >
        <div className="w-120 h-[400px] bg-gray-900 rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-gray-800 p-3 shadow-md flex justify-between items-center">
            <h1 className="text-lg font-bold text-white">
              NGO Child Care Assistant
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoMdClose size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-600 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>{" "}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-3 shadow-lg flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white rounded-lg px-3 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoMdSend size={18} />
            </button>
          </form>
        </div>
      </Transition>
    </>
  );
};

export default ChatWidget;
