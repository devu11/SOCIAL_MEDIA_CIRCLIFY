const io = require("socket.io")(3002, {
  cors: {
    origin: "https://circlify-theta.vercel.app/",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
  
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers);
  });
  

  // send message
  socket.on("send-message", (data) => {
    const { receiverId , senderId, text, senderUsername} = data;
    console.log("Sending from Socket to:", receiverId);
    console.log("Data:", data);
    if (receiverId) {
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
        io.to(user.socketId).emit("receive-notification", {
          message: `You have a new message from ${senderUsername}: ${text}`,
        });
      } else {
        console.log("User not found");
      }
    } else {
      console.log("Receiver ID is null");
    }
  });

  // Follow user
 socket.on("follow-user", (data) => {
  const { followerId, followeeId } = data;
  const followerUsername = findUsernameById(followerId);
  io.to(followeeId).emit("receive-follow-notification", {
    message: `You have a new follower: ${followerUsername}`,
  });
});



socket.on("video-call", (data) => {
  const { callerId, signalData, calleeId } = data;
  io.to(calleeId).emit("video-call", { signal: signalData, callerId });
 });
 


  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
