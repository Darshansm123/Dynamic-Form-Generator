import { render, screen, fireEvent } from '@testing-library/react';
import JSONEditor from '../../src/components/Editor/JSONEditor';
import React from 'react';
test('renders JSON editor and updates state on input', () => {
  const setJson = jest.fn(); // Mock function to track state updates
  render(<JSONEditor json="" setJson={setJson} />);

  // Get the textarea element based on placeholder text
  const textarea = screen.getByPlaceholderText(/Enter your JSON schema here/i);

  // Simulate typing in the textarea (this triggers the setJson function)
  fireEvent.change(textarea, { target: { value: '{"formTitle": "Test"}' } });

  // Assert that setJson is called with the expected argument
  expect(setJson).toHaveBeenCalledWith('{"formTitle": "Test"}');
});
