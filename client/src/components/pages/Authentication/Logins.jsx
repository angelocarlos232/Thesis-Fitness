import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import Webcam from "react-webcam";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/user/userSlice";
import toast from "react-hot-toast";


function Login() {
  const dispatch = useDispatch();

  const [referenceImage, setReferenceImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [loginResult, setLoginResult] = useState("PENDING");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false); // new state to track if capturing


  const navigate = useNavigate();
  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true));
    fetchUsers();
  }, []);

  const loadModels = async () => {
    const MODEL_URL = "/models"; // Adjust the path to your models folder

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserSelection = async (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);

    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/users/${userId}/photo`
        );
        const base64Photo = response.data.photo;
        const blob = base64ToBlob(base64Photo, "image/jpeg");
        const image = await faceapi.bufferToImage(blob);
        setReferenceImage(image);
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    }
  };

  const handleUserImageUpload = async (event) => {
    const file = event.target.files[0];
    const image = await faceapi.bufferToImage(file);
    setUserImage(image);
  };

  const handleWebcamCapture = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    const image = await faceapi.bufferToImage(dataURItoBlob(screenshot));
    setUserImage(image);
    setIsWebcamOpen(true);
    toast.success("Captured")
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const compareImages = async () => {
    if (!referenceImage || !userImage) {
      console.log("No images to compare");
      return;
    }

    const referenceDescriptor = await faceapi
      .detectSingleFace(referenceImage)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const userDescriptor = await faceapi
      .detectSingleFace(userImage)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (referenceDescriptor && userDescriptor) {
      const distance = faceapi.euclideanDistance(
        referenceDescriptor.descriptor,
        userDescriptor.descriptor
      );

      if (distance < 0.6) {
        setLoginResult("SUCCESS");
        handleLoginSuccess();
      } else {
        setLoginResult("FAILED");
      }
    } else {
      setLoginResult("FAILED");
    }
  };

  const handleLoginSuccess = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/api/users/login-with-id",
        {
          userId: selectedUserId,
        }
      );

      if (response.data.success) {
        const userId = response.data.id; // Extract the user ID from the response
        dispatch(signInSuccess(response.data));
        console.log("User ID:", userId); // Log the user ID
        navigate(`/dashboard/${userId}`); // Redirect to dashboard with user ID in the URL
      } else {
        console.error("Login failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const base64ToBlob = (base64, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  };

  return (
    <div className="container text-red-600">
      <div>
        <Link to = '/authentication'><button className="bg-red-600 px-3 py-1 rounded-lg text-white m-6">Go back</button></Link>
      </div>
      {modelsLoaded ? (
        <div className="main-form-faceauth h-72 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Select a user</h1>
          <div className="flex mb-4">
            <select
              onChange={handleUserSelection}
              value={selectedUserId}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            >
              <option value="">Select</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mb-4">
            <button
              onClick={() => setIsWebcamOpen(true)}
              className="bg-red-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Open Webcam
            </button>
          </div>
          {isWebcamOpen && (
            <div className="flex flex-col mb-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-48 mb-4"
              />
              <button
                onClick={handleWebcamCapture}
                className="bg-red-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Capture
              </button>
            </div>
          )}
          <button
            onClick={async () => {
              toast.promise(compareImages(), {
                loading: "Comparing images...",
                success: "Login successful!",
                error: "Login failed. Images do not match.",
              });
            }}
            className="bg-red-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Compare Images
          </button>
        </div>
      ) : (
        <p>Loading models...</p>
      )}
      {loginResult === "SUCCESS" && <p>Login successful!</p>}
      {loginResult === "FAILED" && <p>Login failed. Images do not match.</p>}
    </div>
  );
}

export default Login;
