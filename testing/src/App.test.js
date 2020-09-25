import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders "Hi There!" without crashing', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/Hi There!/i);
    expect(textElement).toBeInTheDocument();
});
