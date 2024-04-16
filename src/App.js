import React, {useState} from "react";
import './Login/LoginForm.css';
import LoginSignUp from "./Login/LoginSignUp";
import {SignUp} from "./Login/SignUp";
import './App.css';
import Footer from "./Footer";
import Header from "./Header";
import FileUploader from "./User_frames/main";
import Decode_f from "./User_frames/Decode.jsx";
import ForgotPasswordForm from "./Login/ForgotPassword";
import CreateCode from "./User_frames/CreateCode";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import useUserContext, {UserProvider} from "./Context";

function App() {
    return (
        <UserProvider>
            <div className="App">
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route index element={<LoginSignUp />} />
                        <Route path='login' element={<LoginSignUp />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='fileuploader' element={<FileUploader />} />
                        <Route path='decode' element={<Decode_f />} />
                        <Route path='forgotpassword' element={<ForgotPasswordForm />} />
                        <Route path='create_code' element={<CreateCode />} />
                    </Routes>
                </BrowserRouter>

                <Footer />
            </div>
        </UserProvider>
    );
}

export default App;




