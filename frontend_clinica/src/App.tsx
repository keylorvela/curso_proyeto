import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const BASE = process.env.REACT_APP_BASE_URL;

async function getUser(correo:any, contrasenna:any) {
  if (!correo || !contrasenna) {
    return { response: [] };
  }
  const url = 'https://backend-proyeto.vercel.app/user/login';
  const data = {
    correo,
    contrasenna,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok)
      return response.json();

  } catch (error) {
    console.error('Error en la función getUser:', error);
    throw error;
  }
}

function App() {
  

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUser("y", "y");
        console.log(userData);
      } catch (error) {
        console.error('ERROR',error);
      }
    }
    
    fetchData();
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Clinica ELS
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
