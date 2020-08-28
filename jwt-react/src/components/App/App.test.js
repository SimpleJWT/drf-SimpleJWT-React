import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Sample DRF SampleJWT Repository/i);
  expect(titleElement).toBeInTheDocument();
});
