import React, { useState, useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../services/Apis";
import { sentOtpFunction } from "../services/Apis";
import "../styles/mix.css";
import CountryData from "./CountryData";

import { useNavigate, useLocation } from "react-router-dom";
const Register = ({ setSubmitted }) => {
  const [bool,setBool]=useState(false)
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [graduationError, setGraduationError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state && location.state.email;
  const email = useRef();
  const phoneNo = useRef();
  const userName = useRef();
  const qualification = useRef();
  const graduation = useRef();
  const course = useRef();

  useEffect(() => {
    if (emailFromState) {
      email.current.value = emailFromState;
    }
    sendOtp();
  }, [emailFromState]); 

  useEffect(() => {
    if (emailFromState) {
      email.current.value = emailFromState;
    }
  }, [emailFromState]);

  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("Name is required!");
      return false;
    }

    const re = /^[a-zA-Z\s]*$/;
    if (!re.test(name)) {
      setNameError("Please enter a valid name (only letters and spaces)!");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      setEmailError("Email is required!");
      return false;
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address!");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      setPhoneError("Phone number is required!");
      return false;
    }

    const re = /^\+?[1-9]\d{1,10}$/;
    if (!re.test(phone)) {
      setPhoneError("Please enter a valid number!");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateCourse = (course) => {
    if (!course.trim()) {
      setCourseError("Course is required!");
      return false;
    }

    setCourseError("");
    return true;
  };

  const validateQualification = (qualification) => {
    if (!qualification.trim()) {
      setQualificationError("Qualification is required!");
      return false;
    }

    setQualificationError("");
    return true;
  };

  const validateGraduation = (graduation) => {
    if (!graduation.trim()) {
      setGraduationError("Year of graduation is required!");
      return false;
    }

    setGraduationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = validateName(userName.current.value);
    const isEmailValid = validateEmail(email.current.value);
    const isPhoneValid = validatePhone(phoneNo.current.value);
    const isQualificationValid = validateQualification(
      qualification.current.value
    );
    const isGraduationValid = validateGraduation(graduation.current.value);
    const isCourseValid = validateCourse(course.current.value);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isQualificationValid ||
      !isGraduationValid ||
      !isCourseValid
    ) {
      return;
    }
  

    const inputData = {
     fname: userName.current.value,
     email : email.current.value,
    dialCode: selectedCountryCode,
      phone: phoneNo.current.value,
      HighestQualification: qualification.current.value,
      course: course.current.value,
      Yog: graduation.current.value,
    };

     const response = await registerfunction(inputData);

    if (response.status === 200) {
      //setSubmitted (true);
      setBool(true)
      toast.success("Registration successful!");
    
     // navigate('/user/otp')
    
     
    } else {
      toast.error(response.response.data.error);
    //  console.log(response);
      //console.log(inputData);
    }
  };
  const sendOtp = async () => {
    if (email.current && email.current.value) {
      const data = {
        email: email.current.value,
      };

      try {
        const response1 = await sentOtpFunction(data);

        if (response1.status === 200) {
          navigate("/user/register", { state: email.current.value });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    } else {
      console.error("Email ref is null or email value is empty.");
    }
  };

   


  return (
    <>
      <div className="w-full bg-gray-300 h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div
            style={{ width: "450px" }}
            className=" h-2/3 rounded-2xl bg-white flex flex-col items-center relative"
          >
            <button className="absolute top-2 right-6 w-4 h-4 font-bold text-lg">
              X
            </button>
            <h1 className="font-sans font-semibold text-xl py-6">
              Register User
            </h1>

            <input
              ref={userName}
              type="text"
              name="name"
              id=""
              placeholder="Enter Name*"
              className={`w-96 p-2 rounded-lg my-2 border ${
                nameError ? "border-red-500" : ""
              }`}
              onBlur={(e) => validateName(e.target.value)}
            />
            {nameError && (
              <p className="text-red-500 self-start pl-6 text-xs">
                {nameError}
              </p>
            )}

            <input
              ref={email}
              type="email"
              name="email"
              id=""
              placeholder="Enter Email*"
              className={`w-96 p-2 rounded-lg my-2 border ${
                emailError ? "border-red-500" : ""
              }`}
              onBlur={(e)=>validateEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 self-start pl-6 text-xs">
                {emailError}
              </p>
            )}
             <p className="text-gray-300 font-sans text-sm">
                You'll receive an OTP on this email for verification.
              </p>

            <div className="flex flex-col w-96 my-2">
              <div className="flex justify-between gap-1">
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="border  rounded-lg flex items-center justify-center"
                >
                  {CountryData.map((code) => (
                    <option
                      key={code.code}
                      value={code.dial_code}
                      className=" w-3 p-2"
                    >
                      {code.dial_code}
                    </option>
                  ))}
                </select>

                <input
                  ref={phoneNo}
                  type="tel"
                  name=""
                  id=""
                  placeholder="Phone Number*"
                  className={`w-96 p-2 rounded-lg border ${
                    phoneError ? "border-red-500" : ""
                  }`}
                  onBlur={(e) => validatePhone(e.target.value)}
                />
              </div>
              {phoneError && (
                <p className="text-red-500 self-start text-xs">{phoneError}</p>
              )}

             
            </div>
            <div>
              <select
                ref={course}
                placeholder=""
                id=""
                className={`w-96 p-2 rounded-lg my-2 border ${
                  courseError ? "border-red-500" : ""
                }`}
                onBlur={(e) => validateCourse(e.target.value)}
              >
                <option value="" disabled selected className="text-gray-400">
                  Course*
                </option>
                <option value="Full Stack Web Development Program">
                  Full Stack Web Development Program
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Others">Others</option>
              </select>
              {courseError && (
                <p className=" text-red-500 self-start text-xs">
                  {courseError}
                </p>
              )}
            </div>
            <div>
              <select
                ref={qualification}
                name=""
                id=""
                className={`w-96 p-2 rounded-lg my-2 border ${
                  qualificationError ? "border-red-500" : ""
                }`}
                onBlur={(e) => validateQualification(e.target.value)}
              >
                <option value="" disabled selected className="text-gray-400">
                  Highest Qualification*
                </option>
                <option value="B.Tech / BE / BCA">B.Tech / BE / BCA</option>
                <option value="M.Tech / MCA">M.Tech / MCA</option>
                <option value="Graduate(Non-Technical)">
                  Graduate(Non-Technical)
                </option>
                <option value="Others">Others</option>
              </select>
              {qualificationError && (
                <p className="text-red-500 self-start text-xs">
                  {qualificationError}
                </p>
              )}
            </div>

            <div>
              <select
                ref={graduation}
                name=""
                id=""
                className={`w-96 p-2 rounded-lg my-2 border ${
                  graduationError ? "border-red-500" : ""
                }`}
                onBlur={(e) => validateGraduation(e.target.value)}
              >
                <option value="" disabled selected className="text-gray-400">
                  Year of graduation*
                </option>
                <option value="After 2024">After 2024</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="Before 2021">Before 2021</option>
              </select>
              {graduationError && (
                <p className="text-red-500 self-start text-xs">
                  {graduationError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-96 bg-orange-400 my-5 py-2 rounded-lg hover:bg-orange-500"
            >
              Register Now
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
