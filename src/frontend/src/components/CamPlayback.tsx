
interface Props {
    src: string,
    width?: number,
    height?: number,
}
export default function CameraPlayback(props: Props) {
    return (
        <img 
            src={`${props.src}`}
            className="bg-gray-950 block shadow-xl"
            width={`${props.width ?? 1280}px`}
            height={`${props.height ?? 720}px`} />
    );
}