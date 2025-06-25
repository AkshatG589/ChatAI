import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "./Header";
import AuthMessages from "./AuthMessages"

const Home = () =>{
  return(
      <>
        <div>
          <Header />          
        </div>
        <div>
          <AuthMessages />
        </div>
      </>
    )
}

export default Home;