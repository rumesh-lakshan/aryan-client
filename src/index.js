import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Remove unused imports
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    fontSize: '24px', 
    fontWeight: 'bold' 
  }}>
    This site is currently unavailable.
  </div>
);

// Remove or comment out the rest of the file
// ...