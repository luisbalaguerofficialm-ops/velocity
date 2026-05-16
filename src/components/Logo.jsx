import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/screen.png";

export default function Logo() {
  return (
    <>
      <Link to="/">
        <img src={logo} className=" w-26 h-20" />
      </Link>
    </>
  );
}
