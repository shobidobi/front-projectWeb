import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import io from 'socket.io-client';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const [codeV, setCodeV] = useState('');
    const [username, setUsername] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketConnection = io('http://localhost:5000');
        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const sendEmail = (email) => {
        socket.emit('send_email', { email });
    };

    const submitCode = (code) => {
        socket.emit('submit_code', { code });
    };

    const changePassword = (username, newPassword) => {
        socket.emit('change_password', { username, newPassword });
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('email_sent', (data) => {
            setMessage(data.message);
            if (data.success) {
                setCodeV(data.message);

                setStep(2);
            } else {
                setMessage(data.message);
            }
        });

        socket.on('code_verified', (data) => {
            setMessage(data.message);
            if (data.success) {

                setStep(3);
            } else {
                setMessage(data.message);
            }
        });

        socket.on('password_changed', (data) => {
            setMessage(data.message);
            if (data.success) {
                setMessage('Password changed successfully!');
            } else {
                setMessage(data.message);
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
                            <p className="pF">{message}</p>
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
                            <p className="pF">{message}</p>
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
