import { StreamChat } from "stream-chat";

// Initialize Stream Chat with your API credentials
const serverClient = StreamChat.getInstance(
  "p6vkg8hjqz8m",
  "ah6zvmsxq9zj86en5ertjpg4mtr48jwa4s947xydhr939d7hjc92yrf3kcenassr"
);

const generateToken = (userId) => {
  return serverClient.createToken(userId);
};

export { generateToken, serverClient };
