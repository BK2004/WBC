import { useEffect, useState } from "react"
import { socket } from "@/services/socket";
import CameraLoadingSkeleton from "./CameraLoadingSkeleton";

interface Props {
    width?: number,
    height?: number,
}
export default function CameraPlayback(props: Props) {
    const [connected, setConnected] = useState(socket.connected);
    const [frame, setFrame] = useState("");
    useEffect(() => {
        const onConnect = () => {
            setConnected(true);
        };

        const onConnectError = (err: Error) => {
            console.log(err);
        }

        const onDisconnect = () => {
            setConnected(false);
        }

        const onConsumeStream = (data: string) => {
            setFrame(data);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        socket.on('consume_stream', onConsumeStream);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('connect_error', onConnectError);
        }
    }, []);

    return (<div 
        className="bg-gray-950 block shadow-xl"
        style={{ width: `${props.width ?? 1280}px`, height: `${props.height ?? 720}px` }}>
        {connected && frame.length > 0 ? 
            <img 
                src={frame}
                className="bg-gray-950 block shadow-xl w-full h-full"
            /> :
            <CameraLoadingSkeleton />}
    </div>);
}