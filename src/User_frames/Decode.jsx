import React, { useState } from 'react';
import './Decode_f.css';

function Decode_f() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [textValue, setTextValue] = useState('');
    const [selectValue, setSelectValue] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFileUploaded(false);
        const file = event.target.files[0]; // קבלת הקובץ הנבחר
        setSelectedFile(file); // עדכון הקובץ הנבחר במצב הקודם

        // בדיקת סוג הקובץ
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp' || file.type === 'audio/aiff' || file.type === 'audio/wav' || file.type === 'audio/mp3' || file.type === 'audio/flac') {
                console.log('הקובץ הוא תמונה או קובץ שמע');
            } else if (file.type === 'application/pdf') {
                console.log('הקובץ הוא PDF');
            } else {
                console.log('סוג הקובץ אינו נתמך');
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('אנא בחר קובץ להעלאה');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('text', textValue);
        formData.append('option', selectValue);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                }
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                setIsFileUploaded(true);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

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
            <input className='textVal' type="text" value={textValue} onChange={(event) => setTextValue(event.target.value)}
                   placeholder="הזן טקסט"/>
            <br/>
            <button className='btnS' onClick={handleUpload}>שליחה</button>
            {uploadProgress > 0 && !isFileUploaded && (
                <div className="progress-bar">
                    <div className="progress" style={{width: `${uploadProgress}%`}}></div>
                </div>
            )}
            {isFileUploaded && <div className="success-message">הקובץ הועלה בהצלחה!</div>}
        </div>
    );
}

export default Decode_f;

