import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/user/userSlice";
import FaceLogo from "../../../assets/face.png";
import "./login.css";

const Login = ({ toggleForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          username,
          password,
        }
      );

      // const
      if (data.error) {
        toast.error(data.error);
      } else {
        setFormData({});
        dispatch(signInSuccess(data)); // Dispatch signInSuccess with user data
        console.log("User ID:", data.id); // Log the user ID
        navigate(`/dashboard/${data.id}`); // Redirect to dashboard with user ID in the URL
        toast.success("Successful Login");
        console.log("login success");
      }
    } catch (error) {
      console.log("error 1");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-1/3 ">
        <div className="main-form">
          <div className="main-form-title flex justify-between">
            <h2>Login</h2>
            <h3>Forgot Password?</h3>
          </div>
          <form>
            <div className="main-form-inputs">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username"
              ></input>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              ></input>
              <div className="flex gap-3">
                <button onClick={loginHandler} style={{ flex: "2 5" }}>
                  Log In
                </button>
                <button
                  className="btn-img flex justify-center"
                  onClick={loginHandler}
                  style={{ flex: "1" }}
                >
                  <img
                    src={FaceLogo}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </button>
              </div>
            </div>
          </form>
          <Button toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
};

const Button = ({ toggleForm }) => {
  return (
    <div className="create-acc-button flex justify-center mt-4">
      <button onClick={toggleForm} className="text-xs">
        CLICK HERE TO CREATE AN ACCOUNT
      </button>
    </div>
  );
};

export default Login;
