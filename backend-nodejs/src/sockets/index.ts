import { Server } from "socket.io";

// Initialize Socket.IO server
// This function initializes the Socket.IO server and handles events
export const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);

    // Handle incoming messages with validation
    socket.on("message", (msg) => {
      if (typeof msg === "string" && msg.trim().length > 0) {
        console.log("Message received:", msg);
        io.emit("message", msg); // Broadcast the message to all connected clients
      } else {
        console.log("Invalid message:", msg);
        socket.emit("error", "Invalid message");
      }
    });

    //Handle private message
    socket.on("privateMessage", (msg, recipientId) => {
      if (typeof msg === "string" && msg.trim().length > 0) {
        console.log("Private message received:", msg);
        socket.to(recipientId).emit("privateMessage", msg);
      } else {
        console.log("Invalid private message:", msg);
        socket.emit("error", "Invalid private message");
      }
    });

    // Handle typing event
    socket.on("typing", (isTyping) => {
      socket.broadcast.emit("typing", isTyping);
    });

    // Handle custom error event
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    // Handle room join
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined room: ${room}`);
    });

    // Handle room leave
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`${socket.id} left room: ${room}`);
    });

    // Handle custom event
    socket.onAny((event, ...args) => {
      console.log(`Received event: ${event}`, args);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // Graceful shutdown when server shuts down
  process.on("SIGINT", () => {
    console.log("Server is shutting down...");
    io.close(() => {
      console.log("Socket server closed");
      process.exit(0);
    });
  });
};
