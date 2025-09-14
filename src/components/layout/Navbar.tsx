"use client";
import React from "react";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";
import { SlHeart } from "react-icons/sl";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Login from "../ui/Login";
const Navbar = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openEnterNumber, setOpenEnterNumber] = useState<boolean>(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const geoLocation = () => {
    console.log("geo location called");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(() => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setError(null);

          console.log("latitude", position.coords.latitude);
          console.log("longitude", position.coords.longitude);
        },
        (err) => {
          console.log("err message", err.message);
          setError(err.message);
        }
      );
    } else {
      setError("Geo location is not supported by this browser");
    }
  };

  return (
    <>
      <div className="h-[72px] w-[1280px] mx-auto flex justify-evenly items-center bg-[#002f3408]  ">
        <div>
          <figure className="h-[60px] w-[60px]">
            <img
              src="/images/olx_logo_2025.svg"
              className="h-[100%] w-[100%]"
            />
          </figure>
        </div>
        {/* Search location*/}
        <div className="h-[50px] w-[270px] bg-white">
          <div className=" h-[100%] flex items-center border-2 border-black focus-within:border-blue-600 rounded-md px-3 py-2 bg-white">
            <FiSearch className="h-[16px] w-[16px]" />
            <input
              type="text"
              placeholder="Search city, area or location"
              className="flex-1 outline-none text-gray-700  "
              onFocus={() => setOpenSearchBar(true)}
            />
            {!openSearchBar && (
              <FiChevronDown
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenSearchBar(!openSearchBar)}
              />
            )}
            {openSearchBar && (
              <FiChevronUp
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenSearchBar(!openSearchBar)}
              />
            )}
          </div>
          {openSearchBar && (
            <>
              <div className=" mt-[10px] w-[100%] rounded-md border bg-white shadow-lg  z-10">
                <div
                  onClick={geoLocation}
                  className="p-[14px] border-b-2 border-solid border-black flex items-center gap-2 text-blue-600 cursor-pointer  hover:bg-blue-50 rounded-md"
                >
                  <FaMapMarkerAlt />
                  <span className="text-[16px] leading-[25px] font-[550] ">
                    Use current location
                  </span>
                </div>
                <p className="text-xs text-gray-400 px-2 mt-2">
                  RECENT LOCATIONS
                </p>
                <div className="px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>India</span>
                </div>
                <p className="text-xs text-gray-400 px-2 mt-2">
                  POPULAR LOCATIONS
                </p>
                <div className="px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>Juni Indore</span>
                </div>
                <div className="px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-md">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>Vijay Nagar</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* main search bar */}

        <div className="h-[50px] w-[450px]">
          <form className="h-full">
            <div className="h-full bg-black flex items-center border-2 border-black focus-within:border-blue-600">
              <input
                type="text"
                placeholder="Search..."
                className="h-full w-full px-2 bg-white outline-none"
              />
              <span className="pl-2 pr-2 text-gray-600 center cursor-pointer bg-black">
                <FiSearch size={20} style={{ color: "white" }} />
              </span>
            </div>
          </form>
        </div>
        <div>
          <div className="select-container">
            <select className="language-select">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            <div className="select-arrow">▼</div>
          </div>
        </div>
        <div className="cursor-pointer">
          <SlHeart style={{ fontSize: "26px" }} />
        </div>
        <div>
          <button
            onClick={() => setOpenLogin(true)}
            className="text-[16px] font-[700] leading-[10px] underline hover:no-underline hover:cursor-pointer"
          >
            Login
          </button>
          {
           ( openLogin ||  openEnterNumber) && <Login setOpenLogin={setOpenLogin} openLogin={openLogin} openEnterNumber={openEnterNumber} setOpenEnterNumber={setOpenEnterNumber} />
          }
        </div>
        <div>
          <div>
            <button className=" h-[40px] w-[85px] bg-white rounded-full shadow font-semibold text-blue-600 cursor-pointer">
              + RENT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
