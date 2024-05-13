import React, { useEffect, useState } from 'react';
import Logo from './Assets/logo.jpg';
import { useUserContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Header() {
    // משתנה state לשמירת שם המשתמש המחובר
    const [username, setUsername] = useState('');
    const { state } = useUserContext();
    const user = state.user;
    const navigate = useNavigate();

    // פונקציה להתנתקות המשתמש
    const handleLogout = () => {
        // Remove user token from localStorage
        localStorage.removeItem('user');

        // Perform logout action, for example:
        // logoutUser();

        // After logout, redirect the user to the login page
        window.location.href = 'http://localhost:3000/login';
    };

    const userID = 0;
    if (user){
        const userID =user.getUserId() ;
    }


    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="לוגו האתר" />
            </div>
            <div className="company-name">Swift Stenography</div>
            <div className="buttons">
                {/* בדיקה האם המשתמש מחובר - אם כן, הצגת שם המשתמש */}
                {user && <div className="logged">ברוך הבא, {user.getUsername()}</div>}
                {/* כפתור התנתקות - מוצג רק אם המשתמש מחובר */}
                {user && <button onClick={handleLogout}>התנתק</button>}
                {user && <button onClick={()=>navigate('/Home/'+user.getUserId())}>דף הבית</button>}
                {/* כפתורי התחברות והרשמה - מוצגים רק אם המשתמש אינו מחובר */}
                {!user && <button onClick={() => window.location.href = 'http://localhost:3000/login'} >התחבר</button>}
                {!user && <button onClick={() => window.location.href = 'http://localhost:3000/signup'}>הרשם</button>}

            </div>
        </nav>
    );
}

export default Header;




