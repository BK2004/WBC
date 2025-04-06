import express from "express";
import socket from "socket.io";
import cors from 'cors';
import apiRouter from "./routes/api.routes"
import { 
	isCameraActive, 
	processFrame, 
	startCamera, 
	stopCamera, 
	StreamCamera 
} from "./services/camera";

export const app = express();

// MIDDLEWARE
app.use(cors());

app.use("/api", apiRouter);

const server = app.listen(3000, () => {
	console.log(`Server listening on port 3000`);
})

const io = new socket.Server(server, {
	cors: {
		origin: "*"
	}
});
io.on("connection", socket => {
	console.log(`Connected to ${socket.handshake.address}.`);

	// if (!isCameraActive()) {
	// 	startCamera();
	// }
});

io.on("disconnect", socket => {
	console.log(`Disconnected from ${socket.handshake.address}.`);

	// if (isCameraActive() && io.engine.clientsCount == 0) {
	// 	stopCamera();
	// }
})

// StreamCamera.on('frame', (data) => {
// 	io.emit("consume_stream", processFrame(data));
// })