import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import he from 'he';// ייבוא הספריה למניעת XSS

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const [codeV, setCodeV] = useState('');
    const [username, setUsername] = useState('');
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const socketConnection = io('http://localhost:5000');
        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const sendEmail = (email) => {
        if (!email) {
            alert('Please enter your email');
            return;
        }
        socket.emit('send_email', { email: he.encode(email) }); // Encode email to prevent XSS
    };

    const submitCode = (code) => {
        if (!code) {
            alert('Please enter the verification code');
            return;
        }
        socket.emit('submit_code', { code: he.encode(code) }); // Encode code to prevent XSS
    };

    const changePassword = (username, newPassword) => {
        if (!username || !newPassword) {
            alert('Please enter both username and new password');
            return;
        }
        socket.emit('change_password', { username: he.encode(username), newPassword: he.encode(newPassword) }); // Encode username and newPassword to prevent XSS
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('email_sent', (data) => {
            setMessage(he.decode(data.message)); // Decode message to display properly
            if (data.success) {
                setCodeV(data.message);

                setStep(2);
            } else {
                setMessage(he.decode(data.message)); // Decode message to display properly
            }
        });

        socket.on('code_verified', (data) => {
            setMessage(he.decode(data.message)); // Decode message to display properly
            if (data.success) {

                setStep(3);
            } else {
                setMessage(he.decode(data.message)); // Decode message to display properly
            }
        });

        socket.on('password_changed', (data) => {
            setMessage(he.decode(data.message)); // Decode message to display properly
            if (data.success) {
                setMessage('Password changed successfully!');
                navigate('/login')
            } else {
                setMessage(he.decode(data.message)); // Decode message to display properly
            }
        });

        return () => {
            socket.off('email_sent');
            socket.off('code_verified');
            socket.off('password_changed');
        };
    }, [socket]);

    if (step === 1) {
        return (
            <div className="allL">
                <div className="containerL">
                    <div className="headerL">
                        <div><h2>Forgot Password</h2></div>
                    </div>
                    <div className="inputsL">
                        <form onSubmit={(e) => { e.preventDefault(); sendEmail(email); }}>
                            <div className="inputL">
                                <input type="email" value={email} placeholder="email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="submit-containerL">
                                <button className="submitL" type="submit">Send Email</button>
                            </div>
                            <p className="pF">{message}</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else if (step === 2) {
        return (
            <div className="allL">
                <div className="containerL">
                    <div className="headerL">
                        <div ><h2>Forgot Password</h2></div>
                    </div>
                    <div className="inputsL">
                        <form onSubmit={(e) => { e.preventDefault(); submitCode(code); }}>
                            <div className="inputL">
                                <input className="Vcode" type="text" placeholder="Verification Code:" value={code}
                                       onChange={(e) => setCode(e.target.value)}/>
                            </div>

                            <div className="submit-containerL">
                                <button className="submitL" type="submit">Verify Code</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else if (step === 3) {
        return (
            <div className="allL">
                <div className="containerL">
                    <div className="headerL">
                        <div><h2>Change Password</h2></div>
                    </div>
                    <div className="inputsL">
                        <form onSubmit={(e) => { e.preventDefault(); changePassword(username, newPassword); }}>
                            <div className="inputs">
                                <input className="inputL" type="text" value={username} placeholder={"Username"}
                                       onChange={(e) => setUsername(e.target.value)}/>
                                <input className="inputL" type="password" placeholder="New Password:"
                                       value={newPassword}
                                       onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>

                            <div className="submit-containerL">
                                <button className="submitL" type="submit">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPasswordForm;
