import React from 'react';

interface JSONEditorProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
  isDarkMode: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, setJson, isDarkMode }) => {
  const [error, setError] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJson = e.target.value;
    setJson(newJson); // Update the JSON state regardless of validity for live feedback
    try {
      JSON.parse(newJson); // Attempt to parse JSON
      setError(''); // Clear the error if valid
    } catch (err) {
      setError('Invalid JSON format'); // Show an error if invalid
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-black' : 'bg-white text-black'}`}>
      <textarea
        value={json}
        onChange={handleChange}
        placeholder="Enter your JSON schema here"
        className={`w-full h-64 p-2 border ${
          error ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
        } rounded-md`}
      />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
