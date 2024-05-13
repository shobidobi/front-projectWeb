import React, { useState } from "react";
import './SignUpForm.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import capture_icon from '../Assets/capture.png';
import io from 'socket.io-client'; // Importing the socket.io client
import he from 'he'; // Importing he library to prevent XSS attacks
function calculateHash(text) {
    let hash = '';
    for (let i = 0; i < text.length; i++) {
        const asciiCode = text.charCodeAt(i) * 5;
        hash += asciiCode.toString();
    }
    return hash;
}
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
            socket.emit('signup', { username: he.encode(calculateHash(username)), password: he.encode(calculateHash(password)), email: he.encode(email), company: he.encode(company) }); // Emit a signup event to the server and encode the data to prevent XSS attacks

            socket.on('signup_response', (data) => {
                setMessage(he.decode(data.message)); // Update the message state with the response from the server and decode the message to display properly
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
