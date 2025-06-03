import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (by checking localStorage token)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Set the default axios authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Get the user data
          const res = await axios.get(
            `${
              import.meta.env.VITE_API_URL || "http://localhost:5000"
            }/api/auth/user`
          );

          setCurrentUser(res.data.user);
        }
      } catch (error) {
        // If the token is invalid, clear it
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = "";
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/auth/register`,
        userData
      );

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // Set the default axios authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setCurrentUser(res.data.user);

      return res.data;
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/auth/login`,
        credentials
      );

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // Set the default axios authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setCurrentUser(res.data.user);

      return res.data;
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Logout user
  const logout = async () => {
    try {
      setLoading(true);

      // Call the backend logout endpoint (optional since we're handling token on client)
      try {
        await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/auth/logout`
        );
      } catch (error) {
        // Ignore errors from logout endpoint, we'll clean up locally anyway
        console.log("Logout endpoint error (ignoring):", error);
      }

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Remove the authorization header
      axios.defaults.headers.common["Authorization"] = "";

      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
