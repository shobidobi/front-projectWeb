import React, {useEffect, useState} from 'react';
import './CreateCode.css';
import io from 'socket.io-client';
import { encryptJsonRsa } from '../RSA';
import {useUserContext} from "../Context";
import UserViewObject from "../UserViewObject";
import { useNavigate } from 'react-router-dom';
import he from 'he'; // ייבוא הספריה למניעת XSS

const socket = io('http://localhost:5000');

function CreateCode() {
    const { state } = useUserContext();
    const navigate = useNavigate();

    const user = state.user;
    const [companyNumber, setCompanyNumber] = useState('');
    const [algorithmType, setAlgorithmType] = useState('');
    const [pixelRangeStart, setPixelRangeStart] = useState('');
    const [pixelRangeEnd, setPixelRangeEnd] = useState('');
    const [fileType, setFileType] = useState('');

    const handleSubmit = () => {
        // בדיקה אם יש ערכים ריקים
        if (!companyNumber || !algorithmType || !pixelRangeStart || !pixelRangeEnd || !fileType) {
            console.error('Please fill all fields');
            return;
        }

        // קבלת מפתח מהשרת
        socket.emit('get_key_company', { company: parseInt(companyNumber) ,fileType: fileType});

        // הקשבה חד פעמית לאירוע 'response' מהשרת
        socket.once('response', (data) => {
            console.log('Received response from server:', data);
            const key = data.key;
            if (!pixelRangeStart || !pixelRangeEnd) {
                setPixelRangeStart(0);
                setPixelRangeEnd(0);
            }
            // הצפנת הנתונים עם המפתח
            const encryptedData = encryptJsonRsa({
                companyNumber,
                algorithmType,
                pixelRangeStart,
                pixelRangeEnd,
                fileType
            }, key);

            // שליחת הנתונים המוצפנים לשרת
            socket.emit('create_code', {encryptedData, company: parseInt(companyNumber),file_type:fileType});
            socket.on('response_code', (data) => {
                // if (typeof data.message === 'string') {
                //     if (data.message.includes('Data has been received and processed successfully')) {
                //         const userID = user.getUserId();
                //         // Dispatch action to set the user in the context
                //         navigate('/Home/' + userID);
                //     }
                // }
            });

        });
    };

    return (
        <div className="allC">
            <div className="create-code-container">
                <h1 className="headerC">Create Code</h1>
                <input
                    type="text"
                    placeholder=" Company Number"
                    value={companyNumber}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                />
                <select value={algorithmType} onChange={(e) => setAlgorithmType(e.target.value)}>
                    <option value="">Choose algorithm</option>
                    <option value="LSB">LSB</option>
                    <option value="MSB">MSB</option>
                    <option value="PVD">PVD(Only for the viewers in the picture)</option>
                </select>
                <input
                    type="text"
                    placeholder="Pixel Range Start"
                    value={pixelRangeStart}
                    onChange={(e) => setPixelRangeStart(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pixel Range End"
                    value={pixelRangeEnd}
                    onChange={(e) => setPixelRangeEnd(e.target.value)}
                />
                <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
                    <option value="">Choose file type</option>
                    <option value="audio">Audio</option>
                    <option value="image">Image</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}


export default CreateCode;
