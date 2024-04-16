import React, { useEffect, useState } from 'react';
import Logo from './Assets/logo.jpg';
import { useUserContext } from './Context';

function Header() {
    // משתנה state לשמירת שם המשתמש המחובר
    const [username, setUsername] = useState('');
    const { getCurrentUser, setUsername: setUsernames } = useUserContext();



    // פונקציה לבדיקת האם המשתמש מחובר
    const checkLoggedIn = () => {
        // קריאה לפונקציה getCurrentUser כדי לבדוק האם המשתמש מחובר
        const user =getCurrentUser()

        // אם המשתמש מחובר, נקבע את שם המשתמש בהתאם
        if (user&&user!==''&&user!=='null') {
            setUsername(user);

        }
    };

    // בקריאה הראשונית לרכיב, בודקים האם המשתמש מחובר
    useEffect(() => {
        checkLoggedIn();
    }, []);

    // פונקציה להתנתקות המשתמש
    const handleLogout = () => {
        // כאן נכתוב את הפעולות להתנתקות המשתמש, לדוגמה:
        // logoutUser();
        // אחרי התנתקות, יתבצע רענון העמוד כך שהמשתמש יועבר למצב התחברות
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="לוגו האתר" />
            </div>
            <div className="company-name">Swift Stenography</div>
            <div className="buttons">
                {/* בדיקה האם המשתמש מחובר - אם כן, הצגת שם המשתמש */}
                {username && <div className="logged">ברוך הבא, {username}</div>}
                {/* כפתור התנתקות - מוצג רק אם המשתמש מחובר */}
                {username && <button onClick={handleLogout}>התנתק</button>}
                {/* כפתורי התחברות והרשמה - מוצגים רק אם המשתמש אינו מחובר */}
                {!username && <button onClick={() => window.location.href = 'http://localhost:3000/login'} >התחבר</button>}
                {!username && <button onClick={() => window.location.href = 'http://localhost:3000/signup'}>הרשם</button>}
                <button>עלינו</button>
            </div>
        </nav>
    );
}

export default Header;

