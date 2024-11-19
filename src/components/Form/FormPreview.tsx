import React from 'react';

interface FormPreviewProps {
  json: string;
  isDarkMode: boolean;
}

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormData {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormPreview: React.FC<FormPreviewProps> = ({ json, isDarkMode }) => {
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submission, setSubmission] = React.useState<Record<string, string> | null>(null);

  React.useEffect(() => {
    try {
      const parsedData = JSON.parse(json) as FormData;
      setFormData(parsedData);
    } catch (err) {
      setFormData(null); // Reset form data if JSON is invalid
    }
  }, [json]);

  const handleChange = (id: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    formData?.fields.forEach((field) => {
      if (field.required && !formValues[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      if (
        field.validation &&
        formValues[field.id] &&
        !new RegExp(field.validation.pattern).test(formValues[field.id])
      ) {
        newErrors[field.id] = field.validation.message;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && formData) {
      setSubmission(formValues);
      alert('Form submitted successfully!');
    }
  };

  const handleDownload = () => {
    if (submission) {
      const jsonBlob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'form_submission.json';
      link.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No submission data to download!');
    }
  };

  if (!formData) {
    return <p className="text-red-500">Invalid JSON format</p>;
  }

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">{formData.formTitle}</h2>
      <p className="mb-4">{formData.formDescription}</p>
      <form onSubmit={handleSubmit}>
        {formData.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {field.label}
            </label>
            {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
              <input
                type={field.type}
                id={field.id}
                value={formValues[field.id] || ''}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={`mt-2 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-md w-full`}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={`mt-2 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-md w-full`}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div className="mt-2">
                {field.options?.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      id={`${field.id}-${option.value}`}
                      name={field.id}
                      value={option.value}
                      checked={formValues[field.id] === option.value}
                      onChange={() => handleChange(field.id, option.value)}
                      className={`mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : null}
            {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
          </div>
        ))}
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">Submit</button>
      </form>

      {submission && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Form Download</h3>
        
          <button onClick={handleDownload} className="mt-2 p-2 bg-green-600 text-white rounded-md">
            Download Here
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPreview;
