import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from "./Context";
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
import Admin_Frame from "./User_frames/Admin_Frame";

function App() {
    return (
        <UserProvider>
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route index element={<LoginSignUp />} />
                        <Route path='login' element={<LoginSignUp />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='forgotpassword' element={<ForgotPasswordForm />} />
                        <Route path='fileuploader/:number' element={<PrivateRoute component={FileUploader} />} />
                        <Route path='decode/:number' element={<PrivateRoute component={Decode_f} />} />
                        <Route path='create_code/:number' element={<PrivateRoute component={CreateCode} />} />
                        <Route path="Home/:number" element={<PrivateRoute component={HomeScreen} />} />
                        <Route path='admin' element={<PrivateRoute component={Admin_Frame} />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useUserContext();

    return isLoggedIn() ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default App;
