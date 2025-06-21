import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  ChannelHeader,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/v2/css/index.css";

// Stream Chat API key
const API_KEY = "p6vkg8hjqz8m"; // This is a test key
const chatClient = StreamChat.getInstance(API_KEY);

const SDKChat = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      // Create a unique user ID and get token from server
      const userId = "demo-user-" + Math.random().toString(36).substring(7);
      const response = await fetch("http://localhost:5000/api/stream-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const { token: userToken } = await response.json();

      try {
        await chatClient.connectUser(
          {
            id: userId,
            name: "Demo User",
            image:
              "https://getstream.io/random_png/?id=demo-user&name=Demo+User",
          },
          userToken
        );
        const channel = chatClient.channel("messaging", "demo-channel", {
          name: "Demo Channel",
          members: [userId],
          created_by: { id: userId },
          permissions: [
            {
              id: userId,
              role: "admin",
              allowed_actions: ["ReadChannel", "SendMessage"],
            },
            { role: "*", allowed_actions: ["ReadChannel", "SendMessage"] },
          ],
        });

        await channel.watch();
        setChannel(channel);
        setClient(chatClient);
      } catch (error) {
        console.error("Error connecting to Stream:", error);
      }
    };

    initChat();
    return () => {
      // Cleanup on unmount
      if (client) {
        client.disconnectUser();
        setClient(null);
        setChannel(null);
      }
    };
  }, []);

  if (!channel || !client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Stream Chat Demo</h1>
        <div className="bg-white rounded-lg shadow-lg h-[600px]">
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>This is a demonstration of the Stream Chat SDK integration.</p>
          <p>
            Compare this with our custom NGO chatbot to see different approaches
            to chat UI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SDKChat;
