import React, { useState } from "react";
import './LoginForm.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

function checkSignUP() {
    const usernameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    // בדיקה אם הערכים ריקים או שיש בהם ערך
    const usernameValue = usernameInput.value.trim(); // trim() מסיר רווחים מתחילת וסופה של מחרוזת
    const emailValue = emailInput ? emailInput.value.trim() : ''; // במקרה שלך, אם האימייל לא קיים, אז נשים את הערך הריק
    const passwordValue = passwordInput.value.trim();

    if (usernameValue === '') {

        return false;
    }

    // בדיקה רק אם האימייל קיים בטופס
    if (emailInput && emailValue === '') {

        return false;
    }

    if (passwordValue === '') {

        return false;
    }

    // אם הגענו לכאן, כל הערכים תקינים
    return true;}

function checkLogin() {
    // קוד הבדיקה להתחברות
    const usernameInput = document.querySelector('input[type="text"]');

    const passwordInput = document.querySelector('input[type="password"]');

    // בדיקה אם הערכים ריקים או שיש בהם ערך
    const usernameValue = usernameInput.value.trim(); // trim() מסיר רווחים מתחילת וסופה של מחרוזת
    const passwordValue = passwordInput.value.trim();

    if (usernameValue === '') {

        return false;
    }

    // בדיקה רק אם האימייל קיים בטופס

    if (passwordValue === '') {

        return false;
    }

    // אם הגענו לכאן, כל הערכים תקינים
    return true;
}
function sendLoginDetailsToPythonAPI(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const apiUrl = 'http://127.0.0.1:5000/api/login';

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.message==='User authentication successful!'){
                return true;
            }
            else if (data.message==='User authentication failed'){return false;}
            alert(data.message);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

function LOGIN(setAction) {
    let flag=false;
    var count=0;
    if (checkLogin()&&flag===false&&count<1) {
        const usernameInput = document.querySelector('input[type="text"]');
        const passwordInput = document.querySelector('input[type="password"]');
        count++;
        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        // קריאה לפונקציה האחראית על שליחת הפרטים לפונקציית ה-API בפייתון
        flag=sendLoginDetailsToPythonAPI(usernameValue, passwordValue)

    } else {
        setAction("Login"); // קוד השינוי של הערך ל"Login"
    }
}

function SIGNUP(setAction) {
    if (checkSignUP()) {

    } else {
        setAction("Sign Up"); // קוד השינוי של הערך ל"Sign Up"
    }
}
function handleForgotPasswordClick() {
    alert("Forgot Password");
}
function handleNewUserClick() {
    alert("New User");
}

export function LoginSignUp() {
    const [action, setAction] = useState("Login"); // יצירת משתנה סטייט עם ערך התחלתי "Login"

    return (
        <div className="all">
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder={"Username"} />
                    </div>
                    {action === "Login" ? <div></div> : <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder={"Email"} />
                    </div>}
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder={"Password"} />
                    </div>
                </div>
                {action === "Sign Up" ? <div></div> :
                    <div>
                        <div className="forgot">Forgot Password? <button className="bt" onClick={handleForgotPasswordClick}>Click
                            here</button></div>
                        <div className="forgot">New user? <button className="bt" onClick={handleNewUserClick}>Click here</button></div>
                    </div>
                }
                <div className="submit-container">
                    <button className={action === "Login" ? "submit grey" : "submit"}
                            onClick={() => SIGNUP(setAction)}>Sign Up
                    </button>
                    <button className={action === "Sign Up" ? "submit grey" : "submit"} onClick={() => LOGIN(setAction)}>Login</button>
                </div>
            </div>
        </div>
    )
}
