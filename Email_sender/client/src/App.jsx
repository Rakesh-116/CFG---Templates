import { useState } from "react";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Email Sender App</h1>
        </div>
      </header>

      <main className="flex-grow">
        {!loggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="flex flex-col">
            <Home user={user} />
            <div className="container mx-auto px-4 py-4 max-w-md">
              <button
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Email Sender App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
