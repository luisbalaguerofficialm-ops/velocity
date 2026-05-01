import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to="/">
        <img src="/src/assets/screen.png" alt="logo " className=" w-26 h-20" />
      </Link>
    </>
  );
}


