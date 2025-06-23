import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "./Header";
import DisplayCurrent from "./DisplayCurrent"

const Home = () =>{
  return(
      <>
        <div>
          <Header />          
        </div>
        <div>
          <DisplayCurrent />
        </div>
      </>
    )
}

export default Home;