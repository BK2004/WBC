import { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";
import EventEmitter from "events";

export type PiCameraOptions = {
    width?: number;
    height?: number;
}

export class PiCamera extends EventEmitter {
    private options: PiCameraOptions;
    private camera_process?: ChildProcessWithoutNullStreams;
    private static JPEGSignature = Buffer.from([0xFF, 0xD8, 0xFF]); // Need to verify, not sure.

    constructor(options: PiCameraOptions) {
        super();
        this.options = options;
    }

    public async activate() { 
        return new Promise<void>(async (resolve, reject) => {
            if (this.camera_process) {
                return reject("Camera already active.");
            }

            this.camera_process = spawn("rpicam-vid", [
                /* Output to stdout */
                "-o",
                "-",

                /* Resolution settings */
                `--width=${this.options.width || 1280}`,
                `--height=${this.options.height || 720}`,

                /* Verbosity */
                "-v",
                "0",

                "--nopreview",
            ])

            // Resolve once camera process gives data
            this.camera_process.stdout.once("data", () => {
                resolve();
            });

            this.camera_process.once("error", () => {
                reject(new Error(
                    "Failed to start Raspberry Pi camera. Is rpicam-vid installed?"
                ));
                this.camera_process = undefined;
            });

            // Buffer for camera process output
            let buffer = Buffer.alloc(0);

            // Listen for new images
            this.camera_process.stdout.on("data", (data: Buffer) => {
                buffer = Buffer.concat([buffer, data]);

                // Emit all image frames from buffer
                while (true) {
                    let signature_idx = buffer.indexOf(PiCamera.JPEGSignature);

                    if (signature_idx === -1) break;

                    // If idx is past start of buffer, need to update
                    if (signature_idx > 0) buffer = buffer.subarray(signature_idx);

                    signature_idx = buffer.indexOf(PiCamera.JPEGSignature, PiCamera.JPEGSignature.length);

                    if (signature_idx === -1) break;
                    
                    this.emit("frame", buffer.subarray(0, signature_idx));
                    buffer = buffer.subarray(signature_idx);
                }
            });

            // Listen for errors
            this.camera_process.stderr.on("error", (err) => this.emit("error", err));
            this.camera_process.stderr.on("data", (data) => this.emit("error", new Error(data)));

            // Listen for close
            this.camera_process.stdout.on('close', async () => {
                this.emit("close");
                this.deactivate();
            });
        })
    }

    public async deactivate() {
        if (this.camera_process) this.camera_process.kill();
        this.camera_process = undefined;
    }

    public isActive() {
        return !!this.camera_process;
    }
}

let cameraActive = false;

export const processFrame = (data: Buffer) => {
    return "data:image/jpeg;base64," + data.toString("base64");
}