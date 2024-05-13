import React from 'react';
import {useUserContext} from "../Context";
import './Home.css';
import { useNavigate } from 'react-router-dom';
function HomeScreen()   {
    const { state } = useUserContext();
    const user = state.user;
    console.log(user);
    const navigate = useNavigate();
    let userID = '';
    if (!user){
        navigate('/login');
    }
    else {
        userID = user.getUserId();
    }
    console.log(user);
    return (
        <div className="home-screen">
            <h1>{user && user.getUsername()+" "},היי </h1>
            <p>?מה תרצה לעשות היום</p>
            <div className="buttons-container">
                <button onClick={() => navigate('/decode/'+userID)}>לפענח</button>
                <button onClick={() =>  navigate('/fileuploader/'+userID)}>להצפין</button>
                {user&&user.getIsChangeCompanyCode()&&<button onClick={() => navigate('/create_code/'+userID)}>לשנות קוד חברה</button>}
                {user&&user.getUsername()==='ariel'&&<button onClick={() => navigate('/admin')}>להוסיף חברה</button>}
            </div>
        </div>
    );
}

export default HomeScreen;
