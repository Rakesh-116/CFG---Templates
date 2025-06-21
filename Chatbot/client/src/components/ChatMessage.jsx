const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`${
          isUser ? "bg-blue-500" : "bg-gray-600"
        } rounded-lg px-4 py-2 max-w-[70%]`}
      >
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
