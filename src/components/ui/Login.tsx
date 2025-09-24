"use client";
import { useState, memo } from "react";
import { FiX, FiPhone } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { X, ArrowLeft } from "lucide-react";
import axios from "axios";

type loginModal = {
  setOpenLogin: (isOpen: boolean) => void;
  setOpenEnterNumber: (isOpen: boolean) => void;
  openLogin: boolean;
  openEnterNumber: boolean;
};

function LoginModal({
  setOpenLogin,
  openLogin,
  setOpenEnterNumber,
  openEnterNumber,
}: loginModal) {
  const [phone, setPhone] = useState<string>("");
  const [disable, setDisabled] = useState<boolean>(true);

  const handleTab = (tab: string) => {
    if (tab === "phone") {
      console.log("handle phone called");
      setOpenEnterNumber(true);
      setOpenLogin(false);
    } else if (tab === "login") {
      setOpenLogin(true);
      setOpenEnterNumber(false);
    } else {
      setOpenLogin(false);
      setOpenEnterNumber(false);
    }
  };

  const handleChange = (number: string) => {
    setPhone(number);
    const regex = /^[6-9]\d{9}$/;
    if (regex.test(number)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const getNumberOtp = async () => {
    // const response = await axios
    console.log("getNumberOtp called");
    try {
      const response = await axios.post("/api/auth/user", { phone });
      console.log("response from otp api", response);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <>
      {openLogin && !openEnterNumber && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
          <div className="relative w-[400px] bg-white rounded-lg shadow-lg p-6 text-center">
            {/* Close Button */}
            <button
              className=" cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => handleTab("")}
            >
              <FiX size={24} />
            </button>

            {/* Illustration */}
            <div className="flex justify-center mb-4">
              <span className="text-5xl">🎸</span>
            </div>

            {/* Title */}
            <p className="text-lg font-medium mb-6">
              Help us become one of the safest places to buy and sell
            </p>

            {/* Continue with phone */}
            <button
              onClick={() => handleTab("phone")}
              className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 mb-3"
            >
              <FiPhone /> Continue with phone
            </button>

            {/* Continue with Google */}
            <button className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 border rounded-md hover:bg-gray-100 mb-3">
              <FcGoogle /> Continue with Google
            </button>

            {/* OR divider */}
            <div className="my-4 flex items-center gap-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Login with Email */}
            <a href="#" className="text-blue-600 font-medium underline">
              Login with Email
            </a>

            {/* Footer text */}
            <p className="mt-6 text-xs text-gray-500">
              All your personal details are safe with us.
            </p>
            <p className="text-xs text-gray-500">
              If you continue, you are accepting{" "}
              <a href="#" className="text-blue-600 underline">
                OLX Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      )}
      {!openLogin && openEnterNumber && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg relative p-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <ArrowLeft
                className="cursor-pointer"
                onClick={() => handleTab("")}
              />
              <X className="cursor-pointer" onClick={() => handleTab("")} />
            </div>

            {/* Logo */}
            <div className="flex justify-center mt-6">
              <img
                src="/images/olx_logo_2025.svg"
                alt="OLX Logo"
                className="h-12"
              />
            </div>

            {/* Heading */}
            <h2 className="text-center text-lg font-semibold mt-6">
              Enter your phone number
            </h2>

            {/* Input Box */}
            <div className="mt-4 flex border-2 border-blue-700 rounded-md overflow-hidden">
              <span className="px-3 py-2 bg-gray-100 border-r border-blue-700 text-gray-700 font-medium">
                +91
              </span>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 px-3 py-2 outline-none"
              />
            </div>

            <button
              onClick={() => getNumberOtp()}
              disabled={disable}
              className={` cursor-pointer w-full mt-6 py-3 rounded-md text-white font-medium transition
            ${
              disable
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }
          `}
            >
              Next
            </button>

            {/* Info Text */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Your contact number is never shared with external parties nor do
              we use it to spam you in any way.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(LoginModal);
