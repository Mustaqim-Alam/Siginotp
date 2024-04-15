import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/Apis";

const RegisterOtp = () => {
  const location = useLocation();
  //const email = location.state && location.state.email;
  

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/^[0-9]{6}$/i.test(otp)) {
      toast.error("Enter Valid OTP (6 digits)");
    } else {
      const data = {
        otp,
        email:location.state,
      };

      try {
        const response = await userVerify(data);
        if (response.status === 200) {
          localStorage.setItem("userdbtoken", response.data.userToken);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        } else {
          toast.error(response.response.data.error);
          console.log(data);
        }
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
            <button className="btn" onClick={registerUser}>
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default RegisterOtp;
