import React from "react";
import Header from "./Header";
import AuthMessages from "./AuthMessages"
import GuestMessages from "./GuestMessages"

const Home = () =>{
  return(
      <>
        <div>
          <Header />          
        </div>
        <div>
          {localStorage.getItem("token")? <AuthMessages /> : <GuestMessages />}
        </div>
      </>
    )
}

export default Home;