import React, { useState } from "react";
import './SignUpForm.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import capture_icon from '../Assets/capture.png';
import io from 'socket.io-client'; // Importing the socket.io client

export function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompanyID] = useState('');
    const [message, setMessage] = useState('');

    const socket = io('http://localhost:5000'); // Connect to the WebSocket server

    function checkSignUp() {
        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || company.trim() === '') {
            return false;
        }
        return true;
    }

    function sendSignUpDetailsToPythonAPI() {
        if (checkSignUp()) {
            socket.emit('signup', { username, password, email, company }); // Emit a signup event to the server

            socket.on('signup_response', (data) => {
                setMessage(data.message); // Update the message state with the response from the server
            });
        } else {
            alert("Please fill all the fields");
        }
    }

    return (
        <div className="all">
            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div>
                    <div className="inputs">
                        <div className="input">
                            <img src={user_icon} alt=""/>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={email_icon} alt=""/>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt=""/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={capture_icon} alt=""/>
                            <input type="text" placeholder="Company_id" value={company} onChange={(e) => setCompanyID(e.target.value)} />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="btnsubmit" onClick={sendSignUpDetailsToPythonAPI}>Sign Up</button>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}
