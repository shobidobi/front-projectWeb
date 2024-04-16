import React, { useEffect, useState } from 'react';
import Logo from './Assets/logo.jpg';
import { useUserContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Header() {
    // משתנה state לשמירת שם המשתמש המחובר
    const [username, setUsername] = useState('');
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    // פונקציה להתנתקות המשתמש
    const handleLogout = () => {
        // כאן נכתוב את הפעולות להתנתקות המשתמש, לדוגמה:
        // logoutUser();
        // אחרי התנתקות, יתבצע רענון העמוד כך שהמשתמש יועבר למצב התחברות
        window.location.reload();
    };
    const userID =user.getUserId() ;

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
                {user && <button onClick={()=>navigate('/Home/'+userID)}>דף הבית</button>}
                {/* כפתורי התחברות והרשמה - מוצגים רק אם המשתמש אינו מחובר */}
                {!user && <button onClick={() => window.location.href = 'http://localhost:3000/login'} >התחבר</button>}
                {!user && <button onClick={() => window.location.href = 'http://localhost:3000/signup'}>הרשם</button>}

            </div>
        </nav>
    );
}

export default Header;




