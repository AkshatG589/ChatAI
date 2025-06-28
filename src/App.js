import AuthState from "./context/auth/authState";
import ChatState from "./context/chat/chatState";
import Register from "./auth/Register"
import Login from "./auth/Login"
import Forgot from "./auth/Forgot"
import Dashboard from "./admin/Dashboard"
import ProfileCard from "./profile/ProfileCard"
import pic from "./pic.webp"
import "./app.css"
//import DisplayCurrent from "./components/DisplayCurrent"
import Home from "./components/Home"
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <AuthState>
      <ChatState>
        <BrowserRouter>
        <div>
          <Toaster
            position="top-center" // still required for structure
            containerStyle={{
              position: "fixed",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
            toastOptions={{
              style: {
                padding: "12px 20px",
                fontSize: "16px",
                textAlign: "center",
              },
            }}
          />
          <Routes>
            <Route exact path="/profile" element={<div className="card-center bg-dark">
              <ProfileCard
  name="Akshat Gupta"
  title="Software Engineer"
  handle="AkCodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl={pic}
  showUserInfo={true}
  enableTilt={true}
  onContactClick={() => console.log('Contact clicked')}
 />
             </div>
 } />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot" element={<Forgot />} />
            <Route exact path="/admin" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
      </ChatState>
    </AuthState>
  );
}

export default App;
