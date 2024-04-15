import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/Apis";
import { sentOtpFunction } from "../services/Apis";

const Otp = () => {
   const location = useLocation();
   
 
console.log(location.state);
  // // Sending OTP
  // const sendOtp = async () => {
  //   try {
  //     const response = await sentOtpFunction(email);
  //     if (response.status === 200) {
  //       console.log("OTP sent successfully");
  //     } else {
  //       console.log("Failed to send OTP",email);
  //     }
  //   } catch (error) {
  //     console.error("Error while sending OTP:", error);
  //   }
  // };

  // // Call the sendOtp function when the component mounts
  // useEffect(() => {
  //   sendOtp();
  // }, []); // Empty dependency array ensures this effect runs only once

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid OTP");
    } else if (otp.length < 6) {
      toast.error("OTP Length should be minimum 6 digits");
    } else {
      const data = {
        otp:otp,
       email:location.state
      };

      try {
        const response = await userVerify(data);
        console.log("i am here");
        if (response.status === 200) {
          localStorage.setItem("userdbtoken",response.data.userToken);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        } else {
          toast.error(response.response.data.error);
          console.log(response.response);
          console.log(data);
        }
       // navigate("/dashboard");
      } catch (error) {
        console.error("Error while verifying OTP:", error);
      }
    }
  };
  

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn" onClick={loginUser}>
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
