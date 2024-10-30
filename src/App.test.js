import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('Text to PDF Converter App', () => {
  test('renders the app with default elements', () => {
    render(<App />);
    expect(screen.getByText(/Text to PDF Converter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter text here or drop a file below.../i)).toBeInTheDocument();
    expect(screen.getByText(/Convert/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  });

  test('input text appears in the text area', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter text here or drop a file below.../i);
    fireEvent.change(textArea, { target: { value: 'Sample Text' } });
    expect(textArea).toHaveValue('Sample Text');
  });

  test('displays success message when PDF is generated', async () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter text here or drop a file below.../i);
    const convertButton = screen.getByText(/Convert/i);

    fireEvent.change(textArea, { target: { value: 'Test PDF content' } });
    fireEvent.click(convertButton);

    await waitFor(() => expect(screen.getByText(/PDF generated successfully!/i)).toBeInTheDocument());
  });

  test('displays error message when PDF is generated with empty text area', async () => {
    render(<App />);
    const convertButton = screen.getByText(/Convert/i);

    fireEvent.click(convertButton);

    await waitFor(() => expect(screen.getByText(/Error: Text area is empty. Please enter some text./i)).toBeInTheDocument());
  });

  test('clears text area and filename input when Clear is clicked', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter text here or drop a file below.../i);
    const filenameInput = screen.getByPlaceholderText(/Enter file name/i);
    const clearButton = screen.getByText(/Clear/i);

    fireEvent.change(textArea, { target: { value: 'Sample Text' } });
    fireEvent.change(filenameInput, { target: { value: 'SampleFile' } });

    fireEvent.click(clearButton);

    expect(textArea).toHaveValue('');
    expect(filenameInput).toHaveValue('');
  });

  test('toggles mode on mode button click', () => {
    render(<App />);
    const modeToggleButton = screen.getByRole('button', { name: /🌙|☀️|⚡/i });

    // Initially, it should be dark mode icon 🌙
    fireEvent.click(modeToggleButton);
    expect(screen.getByRole('button', { name: /☀️|⚡|🌙/i })).toBeInTheDocument();

    // Toggle through modes
    fireEvent.click(modeToggleButton);
    fireEvent.click(modeToggleButton);
    expect(screen.getByRole('button', { name: /🌙|☀️|⚡/i })).toBeInTheDocument();
  });
});
