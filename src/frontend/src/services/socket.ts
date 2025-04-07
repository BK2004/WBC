import { io } from "socket.io-client";

const URL = `http://${window.location.host}:80`;
export const socket = io(URL, { transports: ['websocket']});