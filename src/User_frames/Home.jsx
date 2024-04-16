import React from 'react';
import {useUserContext} from "../Context";
import './Home.css';
import { useNavigate } from 'react-router-dom';
function HomeScreen()   {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const userID =user.getUserId() ;
    console.log(user);
    return (
        <div className="home-screen">
            <h1>היי, {user && user.getUsername()}</h1>
            <p>?מה תרצה לעשות היום</p>
            <div className="buttons-container">
                <button onClick={() => navigate('/decode/'+userID)}>לפענח</button>
                <button onClick={() =>  navigate('/fileuploader/'+userID)}>להצפין</button>
                <button onClick={() => navigate('/create_code/'+userID)}>לשנות קוד חברה</button>
            </div>
        </div>
    );
}

export default HomeScreen;
