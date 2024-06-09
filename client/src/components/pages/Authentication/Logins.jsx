import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import Webcam from "react-webcam";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/user/userSlice";


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
        const response = await axios.get(`http://localhost:8000/api/users/users/${userId}/photo`);
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
    setIsWebcamOpen(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
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
      const response = await axios.post("http://localhost:8000/api/users/api/users/login-with-id", {
        userId: selectedUserId
      });
  
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
    <div className="container text-green-900">
      
      {modelsLoaded ? (
        <div className="mainform">
        <div className="flex bg-gray-500 ">
        <div className="flex">
          <h1>Select a user</h1>
          <select onChange={handleUserSelection} value={selectedUserId}>
            <option value="">Select</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          
          <button onClick={() => setIsWebcamOpen(true)}>Open Webcam</button>
          {isWebcamOpen && (
            <div>
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
              <button onClick={handleWebcamCapture}>Capture</button>
            </div>
          )}
          <button onClick={compareImages}>Compare Images</button>
        </div>
        </div>
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
