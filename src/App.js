import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [mode, setMode] = useState('dark'); // Default mode set to dark

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Toggle between dark, light, and high contrast modes
  const toggleMode = () => {
    if (mode === 'dark') setMode('light');
    else if (mode === 'light') setMode('contrast');
    else setMode('dark');
  };

  const handleGeneratePDF = () => {
    if (text.trim() === '') {
      setMessageType('error');
      setMessage('Text area is empty. Please enter some text.');
      setTimeout(() => setMessage(''), 4000); // Clears the message after 4 seconds
      return;
    }

    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',
    });

    doc.setFontSize(12);
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const textWidth = pageWidth - margin * 2;
    
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, 20);

    doc.save(`${filename || 'convertedText'}.pdf`);

    setMessageType('success');
    setMessage('PDF generated successfully!');
    setText('');
    setFilename('');
    setTimeout(() => setMessage(''), 4000); // Clears the message after 4 seconds
  };

  const handleClearText = () => {
    setText('');
    setFilename('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setMessageType('error');
      setMessage('Please upload a valid .txt file.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setMessageType('error');
      setMessage('Please upload a valid .txt file.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`app-container ${mode}`}>
      <h1 className="app-heading">Text to PDF Converter</h1>
      
      {/* Mode Toggle Button */}
      <button className="mode-toggle-button" onClick={toggleMode}>
        {mode === 'dark' ? '🌙' : mode === 'light' ? '☀️' : '⚡'}
      </button>

      <input
        type="text"
        className="filename-input"
        placeholder="Enter file name "
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />
      <textarea
        rows="8"
        className="app-textarea"
        placeholder="Enter text here or drop a file below..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="file-upload-section">
        <label htmlFor="file-upload" className="file-upload-label">
          <span>Drag & Drop Text File</span> or <span className="browse-button">Browse</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".txt"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drop your text file here</p>
      </div>
      <div className="character-count">
        {characterCount} characters, {wordCount} words
      </div>
      <div className="button-group">
        <button className="app-button" onClick={handleGeneratePDF}>
          Convert
        </button>
        <button className="clear-button" onClick={handleClearText}>
          Clear
        </button>
      </div>
      <p className={`app-message ${messageType === 'error' ? 'error-message' : 'success-message'}`}>
        {message}
      </p>
    </div>
  );
}

export default App;
