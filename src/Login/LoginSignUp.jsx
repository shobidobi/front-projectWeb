
import './LoginForm.css';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useHistory } from 'react-router-dom'; // הוסף את useHistory מ־React Router DOM

function LoginSignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // Connect to the server
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

        // Emit login event to server with username and password
        socket.emit('login', { username, password });

        // Listen for response from server
        socket.on('login_response', (data) => {
            setMessage(data.message);
            if (data.success) {
                // ('/create_code');
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
                        <img src={user_icon} alt=""/>
                        <input type="text" placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="inputLs">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>


                </div>
                <div className="forgot">Forgot Password? <button className="bt"
                                                                 onClick={() => window.location.href = 'http://localhost:3000/forgotpassword'}>Click
                    here</button></div>
                <div className="forgot">New user? <button className="bt"
                                                          onClick={() => window.location.href = 'http://localhost:3000/signup'}>Click
                    here</button></div>
                <div>
            </div>
                <div className="submit-containerLs">
                    <button className="submitLs" onClick={handleLogin}>Login</button>
                </div>
                <p>{message}</p>
        </div>
        </div>
    );
}

export default LoginSignUp;
