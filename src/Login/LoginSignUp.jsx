
import './LoginForm.css';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import io from 'socket.io-client';
import React, {useState, useEffect, useContext} from 'react'; // Import useEffect here
import { useNavigate } from 'react-router-dom';
import UserViewObject from "../UserViewObject";
import { useUserContext } from '../Context';

function LoginSignUp() {
    // השגת ה־context של המשתמשים

    const { user, setUser } = useUserContext();

    // הגדרת משתנים נדרשים
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();



    // Connect to the server
    useEffect(() => {
        const socketConnection = io('http://localhost:5000');
        setSocket(socketConnection);
        console.log(user);

        return () => {
            socketConnection.disconnect();
        };
    }, [user]);

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
            if (typeof data.message === 'string') {
                setMessage(data.message);
                if (data.message.includes('Login Successful')) {
                    // איתחול שם המשתמש ב context של המשתמשים
                    const userViewObject = new UserViewObject(
                        data.user_view.username,
                        parseInt(data.user_view.user_id), // המרת המחרוזת למספר
                        data.user_view.access_key,
                        data.user_view.company_number
                    );
                    console.log(userViewObject);
                    setUser(userViewObject);
                    console.log(user);
                    const userID =userViewObject.getUserId() ;
                    navigate('/Home/'+userID);

                }
            } else {
                console.error('Invalid message format:', data.message);
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

                <div className="submit-containerLs">
                    <button className="submitLs" onClick={handleLogin}>Login</button>
                </div>
                <div>
                    <p className="p">{message}</p>
                </div>

            </div>
        </div>
    );
}

export default LoginSignUp;
