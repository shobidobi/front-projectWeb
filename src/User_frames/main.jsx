// import React, { useState, useEffect } from 'react';
// import './UPFILE.css';
// import io from 'socket.io-client';
//
// const socket = io('http://localhost:5000'); // Connect to the WebSocket server
//
// function FileUploader() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isFileUploaded, setIsFileUploaded] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [textValue, setTextValue] = useState('');
//     const [selectValue, setSelectValue] = useState('');
//     const [message, setMessage] = useState('');
//
//     useEffect(() => {
//         // Define event listener for receiving upload response from server
//         socket.on('upload_response', (data) => {
//             setMessage(data.message);
//             setIsFileUploaded(true);
//         });
//
//         // Cleanup function to remove event listener when component unmounts
//         return () => {
//             socket.off('upload_response');
//         };
//     }, []);
//
//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };
//
//     const handleUpload = () => {
//         if (!selectedFile) {
//             alert('אנא בחר קובץ להעלאה');
//             return;
//         }
//
//         const data = {
//             file: selectedFile,
//             text: textValue,
//             option: selectValue
//         };
//
//         socket.emit('upload', data);
//     };
//
//     return (
//         <div className="file-uploader">
//             <h1 className='title'>הצפנת מסר</h1>
//             <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
//                 <option value="">בחר סוג קובץ</option>
//                 <option value="image">תמונה</option>
//                 <option value="audio">קול</option>
//             </select>
//
//             <input type="file" id="file" className="file-input" onChange={handleFileChange} />
//             <label htmlFor="file" className="custom-file-upload">{selectedFile ? selectedFile.name : 'בחר קובץ'}</label>
//
//             <br />
//             <br />
//             <input className='textVal' type="text" value={textValue} onChange={(event) => setTextValue(event.target.value)}
//                    placeholder="הזן טקסט" />
//             <br />
//             <button className='btnS' onClick={handleUpload}>שליחה</button>
//             {uploadProgress > 0 && !isFileUploaded && (
//                 <div className="progress-bar">
//                     <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
//                 </div>
//             )}
//             {isFileUploaded && <div className="success-message">{message}</div>}
//         </div>
//     );
// }
//
// export default FileUploader;
import React, { useState, useEffect } from 'react';
import './UPFILE.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the WebSocket server

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [textValue, setTextValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Define event listener for receiving file download response from server
        socket.on('file_download', (data) => {
            handleDownload(data.file);
        });

        // Define event listener for receiving upload response from server
        socket.on('upload_response', (data) => {
            setMessage(data.message);
            setIsFileUploaded(true);
        });

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            socket.off('file_download');
            socket.off('upload_response');
        };
    }, []);

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
            text: textValue,
            option: selectValue
        };

        socket.emit('encode', data);
    };

    const handleDownload = (fileData) => {
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${fileData}`;
        link.download = 'file.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="file-uploader">
            <h1 className='title'>הצפנת מסר</h1>
            <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                <option value="">בחר סוג קובץ</option>
                <option value="image">תמונה</option>
                <option value="audio">קול</option>
            </select>

            <input type="file" id="file" className="file-input" onChange={handleFileChange} />
            <label htmlFor="file" className="custom-file-upload">{selectedFile ? selectedFile.name : 'בחר קובץ'}</label>

            <br />
            <br />
            <input className='textVal' type="text" value={textValue} onChange={(event) => setTextValue(event.target.value)}
                   placeholder="הזן טקסט" />
            <br />
            <button className='btnS' onClick={handleUpload}>שליחה</button>
            {uploadProgress > 0 && !isFileUploaded && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}
            {isFileUploaded && <div className="success-message">{message}</div>}
        </div>
    );
}

export default FileUploader;
