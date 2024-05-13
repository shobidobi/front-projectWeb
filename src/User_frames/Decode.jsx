import React, { useState } from 'react';
import './Decode_f.css';
import io from 'socket.io-client';
import {useUserContext} from "../Context";
import {encryptText} from "../RSA";

const socket = io('http://localhost:5000'); // Connect to the WebSocket server

function FileDecoder() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const { state } = useUserContext();
    const user = state.user;
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('אנא בחר קובץ להעלאה');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result; // Get the data in ArrayBuffer format
            const binaryData = new Uint8Array(arrayBuffer); // Convert the data to Uint8Array format

            const data = {
                file: selectedFile,
                option: selectValue,
                user_id:user.getUserId()
            };

            socket.emit('decode', data);
            console.log(data);
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    socket.on('decode_response', (data) => {
        console.log(data);
        setMessage(data.message);
        setIsFileUploaded(true);
    });

    return (
        <div className="file-uploader">
            <h1 className='title'>פענוח מסר</h1>
            <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                <option value="">בחר סוג קובץ</option>
                <option value="image">תמונה</option>
                <option value="audio">קול</option>
            </select>

            <input type="file" id="file" className="file-input" onChange={handleFileChange}/>
            <label htmlFor="file" className="custom-file-upload">{selectedFile ? selectedFile.name : 'בחר קובץ'}</label>

            <br/>
            <br/>

            <br/>
            <button className='btnS' onClick={handleUpload}>שליחה</button>
            {uploadProgress > 0 && !isFileUploaded && (
                <div className="progress-bar">
                    <div className="progress" style={{width: `${uploadProgress}%`}}></div>
                </div>
            )}
            {isFileUploaded && <div className="success-message">הקובץ הועלה בהצלחה!</div>}
            <h1 className="mes_d">:המסר המוצפן הוא</h1>
            <h2 className="mes_d">{message}</h2>
        </div>
    );
}

export default FileDecoder;
