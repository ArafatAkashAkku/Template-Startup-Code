import { useEffect } from "react";
import { useUser } from "../context/User.context";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // socket initialization
  // Note: Ensure that the server is running and accessible at this URL
  const socket = io("http://localhost:5000", {
    transports: ["websocket"], // Enforce only websocket
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
  }, []);

  const handleLogout = () => {
    logout();
    socket.disconnect();
    console.log("Disconnected from server:", socket.id);
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
