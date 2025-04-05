import path from "path";
require('dotenv').config({ path: path.join(__dirname, '../../..', '.env') });
import express from "express";
import socket from "socket.io";

const io = new socket.Server();
io.on("connection", socket => {
	socket.emit("hi");
});

export const app = express();

app.get("/", (req, res) => {
	res.send("<h1>Hello, world!</h1>");
})

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})