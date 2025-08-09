import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context.jsx";
import { useContext } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { isLogin, setIsLogin, token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken("");
      setIsLogin(false);
    }
  };

  return (
    <div className=" flex justify-between py-3">
      <div
        className="logo  flex justify-center items-center ml-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="title text-sm sm:text-2xl font-semibold text-orange-400   flex">
          Nomado
        </span>
      </div>
      <div className="leftText  flex items-center">
        <Link
          to={isLogin ? `/add-list` : `/authForm`}
          className="add hidden sm:inline-block text-center bg-slate-300 py-3 px-8 mx-8 rounded-3xl"
        >
          Add List
        </Link>

        <Link
          to={isLogin ? `/add-list` : `/authForm`}
          className="add text-center  sm:hidden inline-block bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl"
        >
          <MdFormatListBulletedAdd />
        </Link>

        <Link
          to={isLogin ? `/` : `/authForm`}
          onClick={checkLogin}
          className="menu hidden sm:inline-block  text-center bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl"
        >
          {isLogin ? "Logout" : "Login"}
        </Link>

        <Link
          to={isLogin ? `/` : `/authForm`}
          onClick={checkLogin}
          className="menu sm:hidden inline-block text-center bg-slate-300 py-2 px-3 mx-2
 sm:py-3 sm:px-8 sm:mx-8 rounded-3xl"
        >
          {isLogin ? <CiLogout /> : <IoIosLogIn />}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
