import React, { useState, useEffect } from 'react';
import JSONEditor from './components/Editor/JSONEditor';
import FormPreview from './components/Form/FormPreview';
import './index.css'; // Ensure styles are properly imported

const App: React.FC = () => {
  const [json, setJson] = useState<string>(''); // State to store the JSON schema
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Dark mode state

  useEffect(() => {
    // Initially, check if dark mode is set in localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle('dark', savedDarkMode);
  }, []);

  // Toggle dark mode and save it in localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString()); // Store dark mode preference in localStorage
    document.body.classList.toggle('dark', newDarkMode); // Apply dark mode class
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Dark Mode Toggle Button */}
      <div className="fixed top-4 right-4 z-10">
        <button 
          onClick={toggleDarkMode} 
          className="p-2 bg-gray-800 text-white rounded-full dark:bg-white dark:text-gray-800"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* JSON Editor Section */}
      <div className="w-full md:w-1/2 p-4 overflow-auto border-r">
        <h2 className="text-lg font-bold mb-4">JSON Editor</h2>
        <JSONEditor json={json} setJson={setJson} isDarkMode={isDarkMode} /> {/* Pass dark mode state */}
      </div>

      {/* Form Preview Section */}
      <div className="w-full md:w-1/2 p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-4">FORM Preview</h2>
        <FormPreview json={json} isDarkMode={isDarkMode} /> {/* Pass dark mode state */}
      </div>
    </div>
  );
};

export default App;
