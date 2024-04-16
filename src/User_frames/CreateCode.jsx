import React, { useState } from 'react';
import './CreateCode.css';

function CreateCode() {
    const [companyNumber, setCompanyNumber] = useState('');
    const [algorithmType, setAlgorithmType] = useState('');
    const [pixelRangeStart, setPixelRangeStart] = useState('');
    const [pixelRangeEnd, setPixelRangeEnd] = useState('');
    const [fileType, setFileType] = useState('');

    const handleSubmit = async () => {
        // בדיקה אם יש ערכים ריקים
        if (!companyNumber || !algorithmType || !pixelRangeStart || !pixelRangeEnd || !fileType) {
            console.error('Please fill all fields');
            return;
        }

        // המשך עם הפעולה
        const data = {
            companyNumber: parseInt(companyNumber),
            algorithmType,
            pixelRange: [parseInt(pixelRangeStart), parseInt(pixelRangeEnd)],
            fileType
        };

        try {
            const handle = await window.showSaveFilePicker();
            await handle.createWritable().then(async writable => {
                await writable.write(JSON.stringify(data));
                await writable.close();
            });
            console.log('Data has been saved successfully');
        } catch (err) {
            console.error('Error saving data:', err);
        }
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
