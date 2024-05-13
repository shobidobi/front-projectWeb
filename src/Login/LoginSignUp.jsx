import './LoginForm.css';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import io from 'socket.io-client';
import he from 'he'; // ייבוא הספריה למניעת XSS

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserViewObject from "../UserViewObject";
import { useUserContext } from "../Context";

function calculateHash(text) {
    let hash = '';
    for (let i = 0; i < text.length; i++) {
        const asciiCode = text.charCodeAt(i) * 5;
        hash += asciiCode.toString();
    }
    return hash;
}

function LoginSignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('');
    const { dispatch } = useUserContext(); // Use dispatch instead of setUser

    useEffect(() => {
        const socketConnection = io('http://localhost:5000');
        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const handleLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
            setMessage('Username and password are required');
            return;
        }

        if (!socket) {
            setMessage('Error: Socket connection not established');
            return;
        }

        console.log('Sending login request:', { username: username, password: calculateHash(password) });

        socket.emit('login', { username: username, password: calculateHash(password) });

        socket.on('login_response', (data) => {
            if (typeof data.message === 'string') {
                setMessage(he.decode(data.message)); // Decode HTML entities
                if (data.message.includes('Login Successful')) {
                    // Initialize the user context with the user data
                    const userViewObject = new UserViewObject(
                        data.user_view.username,
                        parseInt(data.user_view.user_id),
                        data.user_view.access_key,
                        data.user_view.company_number,
                        data.user_view.is_change_code
                    );
                    console.log(userViewObject);
                    // Dispatch action to set the user in the context
                    dispatch({ type: 'SET_USER', payload: userViewObject });
                    const userID = userViewObject.getUserId();
                    navigate('/Home/' + userID);
                }
            }
        });
    };

    return (
        <div className="allLs">
            <div className="containerLs">
                <div className="headerLs">
                    <div className="textLs">Login</div>
                    <div className="underlineLs"></div>
                </div>
                <div className="inputsLs">
                    <div className="inputLs">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="inputLs">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="forgot">Forgot Password? <button className="bt"
                                                                 onClick={() => navigate('/forgotpassword')}>Click
                    here</button></div>
                <div className="forgot">New user? <button className="bt"
                                                          onClick={() => navigate('/signup')}>Click
                    here</button></div>
                <div className="submit-containerLs">
                    <button className="submitLs" onClick={handleLogin}>Login</button>
                </div>
                <div>
                    <p className="p">{message}</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default LoginSignUp;
