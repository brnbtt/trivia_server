const io = require("socket.io")(3333, {
  cors: {
    origin: "*",
  },
});

console.log("Socket.io server started on port 3333");

let players = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  // Assign a unique ID to the player
  const playerId = socket.id;

  // Add the player to the list of players
  players[playerId] = {
    id: playerId,
    name: null,
    score: 0,
  };

  // Emit a playerJoined event to all connected clients
  io.emit("playerJoined", players[playerId]);

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");

    // Remove the player from the list of players
    delete players[playerId];

    // Emit a playerLeft event to all connected clients
    io.emit("playerLeft", playerId);
  });

  let firstPlayer = null;

  socket.on("buttonPressed", () => {
    console.log(`Player ${players[playerId].name} pressed the button`);

    // Keep track of the first player to press the button
    if (firstPlayer === null) {
      firstPlayer = playerId;

      // Emit a firstPlayer event to all connected clients, including the host
      io.emit("firstPlayer", firstPlayer);
    }
  });

  socket.on("nameEntered", (name) => {
    console.log(`Player ${playerId} entered their name: ${name}`);

    // Update the player object with the entered name
    players[playerId].name = name;
  });
});
