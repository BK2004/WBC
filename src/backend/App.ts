import express from "express";
import socket from "socket.io";
import cors from 'cors';

const io = new socket.Server();
io.on("connection", socket => {
	socket.emit("hi");
});

export const app = express();

// MIDDLEWARE
app.use(cors());

app.get("/api", (_req, res) => {
	res.status(200).send("Hello, world!");
});

app.listen(3000, () => {
	console.log(`Server listening on port 3000`);
})