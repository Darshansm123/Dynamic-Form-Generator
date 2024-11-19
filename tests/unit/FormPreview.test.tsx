import { render, screen, fireEvent } from '@testing-library/react';
import  FormPreview  from '../../src/components/Form/FormPreview'; // With curly braces
import React from 'react';
import '@testing-library/jest-dom';
const validJson = `{
  "formTitle": "Test Form",
  "formDescription": "Please fill out this form",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Name",
      "required": true
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Invalid email"
      }
    }
  ]
}`;

test('form displays error message when required fields are not filled', () => {
  render(<FormPreview json={validJson} />);
  
  // Simulate clicking the submit button (assuming you have a submit button in FormPreview)
  fireEvent.click(screen.getByText('Submit'));
  
  // Assert that the validation error messages are displayed
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});

test('form submits data when valid', () => {
  render(<FormPreview json={validJson} />);
  
  // Simulate filling out the form
  fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'john@example.com' } });
  
  // Simulate clicking the submit button
  fireEvent.click(screen.getByText('Submit'));
  
  // Assert that the error messages are no longer present
  expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
});
