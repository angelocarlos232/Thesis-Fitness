import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Settings() {


  const [showWebcam, setShowWebcam] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  const handleFaceClick = (e) => {
    e.preventDefault();
    setShowWebcam(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setVideoStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  };

  const handleSave = () => {
    const userId = window.location.href.split("/settings/")[1];
    if (videoStream) {
      const video = document.getElementById("webcam-video");
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      // Send imageData to the server
      fetch(`http://localhost:8000/api/users/savephoto/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Photo saved:", data);
        toast.success("Registration Successful")
      })
      .catch((error) => {
        console.error("Error saving photo:", error);
      });
  }
};

  useEffect(() => {
    if (videoStream) {
      const video = document.getElementById("webcam-video");
      video.srcObject = videoStream;
      video.play();
    }
  }, [videoStream]);
  return (
    <>
    <div className="flex justify-center items-center">
        <div>
      <button
        className="bg-red-600 px-3 py-1 rounded-lg text-white mt-6 h-16"
        onClick={handleFaceClick}
      >
        Register Face
      </button>
      {showWebcam && (
        <div className="webcam-container mt-6">
          <video id="webcam-video" width="70%" height="70%"></video>
          <button
            className="px-3 py-1 bg-red-600 rounded-lg text-white mt-6"
            onClick={handleSave}
          >
            Register
          </button>
        </div>
      )}
      </div>
      </div>
    </>
  );
}