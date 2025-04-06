import { StreamCamera as sc, Codec, SensorMode } from "pi-camera-connect";

let cameraActive = false;

export const StreamCamera = new sc({
    codec: Codec.MJPEG,
    sensorMode: SensorMode.Mode6
})

export async function startCamera() {
    await StreamCamera.startCapture();
    cameraActive = true;
}

export async function stopCamera() {
    await StreamCamera.stopCapture();
    cameraActive = false;
}

export const processFrame = (data: Buffer) => {
    return "data:image/jpeg;base64," + data.toString("base64");
}

export const isCameraActive = () => {
    return cameraActive;
}