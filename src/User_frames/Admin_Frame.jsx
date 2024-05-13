import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Admin_style.css';
const socket = io.connect('http://localhost:5000');

function CompanyManagement() {
    const [companyName, setCompanyName] = useState('');
    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('admin_information', (data) => {
            setMessage(data.message);
        });

        return () => {
            socket.off('admin_information');
        };
    }, []);

    const handleAddCompany = () => {
        if (companyName.trim() !== '') {
            socket.emit('admin', { companyName });
        } else {
            alert('נא להזין שם חברה');
        }
    };

    return (
        <div className="allad-">
            <div className="container-">
                <h1 className="H11">הוספת חברה חדשה</h1>
                <input
                    className="input-"
                    type="text"
                    placeholder="שם החברה"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <button className="btn-" onClick={handleAddCompany}>הוסף חברה</button>

                {message && <div className="message-">{message}</div>}

            </div>
        </div>

    );
}

export default CompanyManagement;
