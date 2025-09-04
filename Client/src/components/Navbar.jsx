import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context.jsx";
import { useContext } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
// import { useEffect } from "react";

const Navbar = () => {
  const { isLogin, setIsLogin, token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkLogin = async () => {
    if (token) {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,{},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("nomado-token");
        setToken("");
        setIsLogin(false);
      }
    }
    // navigate(`/`)
    else {
      navigate(`/authForm`);
    }
  };
  // useEffect(() => {
  //        console.log(isLogin)

  // }, [isLogin])

  return (
    <div className=" flex justify-between py-3">
      <div
        className="logo  flex justify-center items-center ml-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <button className="title text-sm sm:text-2xl font-semibold text-orange-400   flex">
          Nomado
        </button>
      </div>
      <div className="leftText  flex items-center">
        <Link
          to={isLogin ? `/add-list` : `/authForm`}
          className="add hidden sm:inline-block text-center bg-slate-300 py-3 px-8 mx-8 rounded-3xl"
        >
          Add List
        </Link>

        <Link
          to={isLogin ? "/add-list" : "/authForm"}
          className={`add text-center  sm:hidden inline-block bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl`}
        >
          <MdFormatListBulletedAdd />
        </Link>

        <button
          // to={isLogin ? `/` : `/authForm`}
          onClick={checkLogin}
          className="menu hidden sm:inline-block  text-center bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl"
        >
          {isLogin ? "Logout" : "Login"}
          {/* {console.log(isLogin)} */}
        </button>

        <button
          // to={isLogin ? `/` : `/authForm`}
          onClick={checkLogin}
          className="menu sm:hidden inline-block text-center bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl"
        >
          {isLogin ? <CiLogout /> : <IoIosLogIn />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
