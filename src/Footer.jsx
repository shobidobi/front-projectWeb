import emailIcon from './Assets/email.png';
import React from 'react';
import io from "socket.io-client";
import he from 'he'; // ייבוא הספריה למניעת XSS

const socket = io('http://localhost:5000');

function Footer() {
    const handleSubmit = () => {
        const email = he.encode(document.getElementById('emailInput').value); // קבלת ערך האימייל מהאינפוט
        console.log(email);
        // שליחת האימייל לשרת דרך הסוקט
        socket.emit('send_Newsletter', { email: email });
    };

    return (
        <footer className="footer">
            <div className="email-icon-container">
                <img src={emailIcon} alt="email" className="email-icon"/>
                <span className="icon-text">swift_steno@proton.me -ליצירת קשר</span>
            </div>
            <form className="form">
                <input id="emailInput" type="text" name="email" placeholder="הכנס כתובת אימייל"/>
                <input type="button" value="שלח" onClick={handleSubmit}/>
                <label>:הרשמה לניוזלטר</label>
            </form>
            <p className={"cp"}>כל הזכויות שמורות לאריאל דובקין© </p>
        </footer>
    );
}

export default Footer;
