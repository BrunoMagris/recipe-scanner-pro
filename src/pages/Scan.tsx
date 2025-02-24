
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, RotateCcw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg"));
    setHasPhoto(true);

    // Stop the video stream
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const retakePhoto = () => {
    setHasPhoto(false);
    setPhoto(null);
    // Restart the camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  };

  const confirmPhoto = () => {
    navigate("/review", { state: { photo } });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Camera View */}
      <div className="flex-1 relative">
        {!hasPhoto ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Overlay for alignment */}
            <div className="absolute inset-0 border-[40px] border-black/50">
              <div className="w-full h-full border-2 border-white/50 rounded-lg"></div>
            </div>
          </>
        ) : (
          <img
            src={photo || ""}
            alt="Captured prescription"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-6 animate-slideUp">
        <div className="container max-w-md flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          {!hasPhoto ? (
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-white hover:bg-white/90"
              onClick={takePhoto}
            >
              <Camera className="h-8 w-8 text-gray-900" />
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-white hover:bg-white/90"
                onClick={retakePhoto}
              >
                <RotateCcw className="h-8 w-8 text-gray-900" />
              </Button>
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-medical-500 hover:bg-medical-600"
                onClick={confirmPhoto}
              >
                <Check className="h-8 w-8 text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
