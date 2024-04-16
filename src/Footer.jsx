// Footer.js

import emailIcon from './Assets/email.png';
import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <img src={emailIcon} alt="email" className="email-icon"/>
            <form className="form">
                <input type="submit" value="שלח"/>
                <label>
                    <input type="text" name="email"/>
                    :הרשמה לניוזלטר
                </label>
            </form>
            <p className={"cp"}>כל הזכויות שמורות לאריאל דובקין© </p>
        </footer>
    );
}

export default Footer;
