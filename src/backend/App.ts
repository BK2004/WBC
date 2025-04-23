import express from "express";
import socket from "socket.io";
import cors from 'cors';
import apiRouter from "./routes/api.routes";
import process from "process";
import { config } from "dotenv";
import { 
	PiCamera,
	processFrame, 
} from "./services/camera";

// configure environment variables
config({
	path: __dirname.substring(0, __dirname.indexOf("backend") + 7) + "/.env"
});

console.log(process.env.NODE_ENV);

export const app = express();
export const picam = new PiCamera({});
export const PORT = process.env.NODE_ENV === "development" ? 3000 : 80;

// MIDDLEWARE
app.use(cors());

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(__dirname + "/../../frontend/dist"));
}

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})

const io = process.env.NODE_ENV === "production" ? new socket.Server(server) : new socket.Server(server, {
	cors: {
		origin: "*"
	}
});

io.on("connection", socket => {
	console.log(`Connected to ${socket.handshake.address}.`);

	if (!picam.isActive()) {
		picam.activate()
			.then(() => {})
			.catch((e) => {
				console.log("Failed to start camera... Are you sure your camera and/or rpicam-tools are installed correctly?");
			})
	}
});

io.on("disconnect", socket => {
	console.log(`Disconnected from ${socket.handshake.address}.`);

	if (picam.isActive() && io.engine.clientsCount == 0) {
		picam.deactivate();
	}
})

picam.on('frame', (data) => {
	io.emit("consume_stream", processFrame(data));
})