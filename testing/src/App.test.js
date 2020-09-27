// There was a lot of confusion over the fact that the default contents of this file do not look like those in the instruction video.
// It turned out that both approaches work. Commented out below is the approach with slight changes to the default code.
/* import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/Hi there!/i);
    expect(textElement).toBeInTheDocument();
}); */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(div.innerHTML).toContain('Hi there!');
    ReactDOM.unmountComponentAtNode(div);
});

