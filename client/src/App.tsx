import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Posts from "./pages/Posts"
import { Toaster } from 'react-hot-toast';
import EmailVerification from "./pages/EmailVerification";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";



const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Signup />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/posts' element={<Posts />} />
          </Route>
          <Route path="/verify" element={<EmailVerification />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
