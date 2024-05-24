const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const prisma = require("./prisma/client");
const movieRoutes = require("./routes/movieRoutes");
const channelRoutes = require("./routes/channelRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const typeRoutes = require("./routes/typeRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movieRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/users", userRoutes);


// Socket.io setup for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit a message when data changes
  prisma.$use(async (params, next) => {
    const result = await next(params);
    if (['Movie', 'WatchLater', 'Favorite'].includes(params.model)) {
      io.emit('dataChanged', { model: params.model });
    }
    return result;
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
