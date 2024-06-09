import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

function YourComponent() {
  const [showWebcam, setShowWebcam] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const webcamRef = useRef(null);

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
    const imageSrc = webcamRef.current.getScreenshot();
    // Process the image (e.g., send it to the server)
    console.log("Captured image: ", imageSrc);
    setShowWebcam(false); // Hide the webcam and show the register button again
  };

  return (
    <div className="container text-center">
      {!showWebcam && (
        <button
          className="bg-red-600 px-3 py-1 mt-6 rounded-lg text-white"
          onClick={handleFaceClick}
        >
          Register Face
        </button>
      )}
      {showWebcam && (
        <div className="webcam-container mt-6 flex flex-col justify-center items-center mt-24">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-3/5 h-3/5"
          />
          <button
            className="px-3 py-1 bg-red-600 rounded-lg text-white mt-6"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default YourComponent;
