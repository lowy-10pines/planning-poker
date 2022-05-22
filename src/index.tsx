import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { RoomContextProvider } from './contexts/RoomContext';
import { UserContextProvider } from './contexts/UserContext';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { VotesContextProvider } from './contexts/VotesContext';
import { getAuth, signInAnonymously } from 'firebase/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyAXEaorh3Uo7j5iAjFeCt1nJRVJUVVMu7M",
  authDomain: "planning-poker-da9e4.firebaseapp.com",
  projectId: "planning-poker-da9e4",
  storageBucket: "planning-poker-da9e4.appspot.com",
  messagingSenderId: "1031015299633",
  appId: "1:1031015299633:web:6b8e8218cb24b1e093b310"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
if (!auth.currentUser) {
  console.log("Signin in!")
  signInAnonymously(auth);
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <RoomContextProvider>
          <VotesContextProvider>
            <App />
          </VotesContextProvider>
        </RoomContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
