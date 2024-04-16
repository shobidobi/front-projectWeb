import React, { useState } from 'react';
import './Form.css';

export function Forms () {
    const [loginMode, setLoginMode] = useState(true); // קביעת מצב התחלתי להתחברות

    const handleToggleMode = () => {
        setLoginMode(!loginMode); // החלפת מצב בין התחברות והרשמה
    };

    return (
        <div className="form-container">
            <h2>{loginMode ? 'התחברות' : 'הרשמה'}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">שם משתמש</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" id="password" name="password" />
                </div>
                {!loginMode && (
                    <div className="form-group">
                        <label htmlFor="email">אימייל</label>
                        <input type="email" id="email" name="email" />
                    </div>
                )}
                <button type="submit">{loginMode ? 'התחברות' : 'הרשמה'}</button>
            </form>
            <p onClick={handleToggleMode}>
                {loginMode ? 'לא רשום עוד? לחץ כאן להרשמה' : 'כבר רשום? לחץ כאן להתחברות'}
            </p>
        </div>
    );
}

