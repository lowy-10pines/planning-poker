import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { RoomContextProvider } from './contexts/RoomContext';
import { UserContextProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <RoomContextProvider>
          <App />
        </RoomContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
