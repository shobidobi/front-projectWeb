import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context"; // מייבאים את ה־UserProvider מה־Context
import './Login/LoginForm.css';
import LoginSignUp from "./Login/LoginSignUp";
import { SignUp } from "./Login/SignUp";
import './App.css';
import Footer from "./Footer";
import Header from "./Header";
import FileUploader from "./User_frames/main";
import Decode_f from "./User_frames/Decode.jsx";
import ForgotPasswordForm from "./Login/ForgotPassword";
import CreateCode from "./User_frames/CreateCode";
import PageNotFound from "./PageNotFound";
import HomeScreen from "./User_frames/Home";

function App() {
    return (
        <UserProvider> {/* כאן מכניסים את ה־UserProvider סביב כל האפליקציה */}
            <div className="App">

                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route index element={<LoginSignUp />} />
                        <Route path='login' element={<LoginSignUp />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='forgotpassword' element={<ForgotPasswordForm />} />
                        <Route path='fileuploader/:number' element={<FileUploader />} />
                        <Route path='decode/:number' element={<Decode_f />} />
                        <Route path='create_code/:number' element={<CreateCode />} />
                        <Route path="Home/:number" element={<HomeScreen />} />
                        <Route path='*' element={<PageNotFound />} />

                    </Routes>
                    <Footer />
                </BrowserRouter>

            </div>
        </UserProvider>
    );
}

export default App;
