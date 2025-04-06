import LoadingCircle from "@/icons/LoadingCircle.svg?react";

export default function CameraLoadingSkeleton() {
    return (
        <div className="spinner text-white w-full flex items-center align-middle h-full px-[45%] aspect-square opacity-60">
            {/* <LoadingCircle /> */}
            <LoadingCircle className="text-white h-full w-full" />
        </div>
    );
}