import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Fetch the user email and token from local storage
    let user: {email: string, token: string} = JSON.parse(localStorage.getItem('user')!)
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch(`http://sensolockdev.eastus.cloudapp.azure.com/auth-service/verify`, {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.email || '')
      })
  }, [])  


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/search" element={<Search email={email} loggedIn={loggedIn} />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
