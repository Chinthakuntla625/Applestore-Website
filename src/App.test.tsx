import { render, screen } from '@testing-library/react';
import App from './App';

// Define a test case for rendering the App component
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Check if the element with the text 'learn react' is present in the document
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is in the document
  expect(linkElement).toBeInTheDocument();
});






// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
