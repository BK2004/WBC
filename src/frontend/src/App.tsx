// import CameraPlayback from "@/components/CamPlayback"
import { useEffect, useState } from "react"
import { socket } from "@/services/socket";

function App() {
  const [message, setMessage] = useState("N/A");
  const [connected, setConnected] = useState(socket.connected);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected")
      setConnected(true);
    };

    const onConnectError = (err: Error) => {
      console.log(err);
    }

    const onDisconnect = () => {
      console.log("disconnected");
      setConnected(false);
    }

    const onEvent = (val: string) => {
      setMessage(val);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onEvent);
    socket.on('connect_error', onConnectError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('message', onEvent);
    }
  }, [])

  return (<div className="w-full h-full flex flex-col items-center py-8 px-8">
    <h1>You are {connected ? "connected" : "not connected"}.</h1>
    <h2>Message: {message}</h2>
    {/* <CameraPlayback src='/api/camera' /> */}
  </div>)
}

export default App
