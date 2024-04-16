import React, { useState } from 'react';
import './Decode_f.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the WebSocket server

function FileDecoder() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [selectValue, setSelectValue] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('אנא בחר קובץ להעלאה');
            return;
        }

        const data = {
            file: selectedFile,
            option: selectValue
        };

        socket.emit('decode', data);
    };

    socket.on('decode_response', (data) => {
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
            <h1>המסר המוצפן הוא:</h1>
            <h2>{message}</h2>
        </div>
    );
}

export default FileDecoder;
