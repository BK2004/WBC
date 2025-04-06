import express from "express";
import socket from "socket.io";
import cors from 'cors';
import apiRouter from "./routes/api.routes"

export const app = express();

// MIDDLEWARE
app.use(cors());

app.use("/api", apiRouter);

const server = app.listen(3000, () => {
	console.log(`Server listening on port 3000`);
})

const io = new socket.Server(server);
io.on("connection", socket => {
	socket.send("hi");

	setTimeout(() => {
		io.emit("message", "you are a great person")
	}, 5000)
});