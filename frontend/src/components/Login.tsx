import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Logo from './Logo';


const Login = (props: {
  loggedIn: boolean,
  email: string,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
}) => {
  const {loggedIn, email, setLoggedIn, setEmail} = props
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
        setEmailError('Please enter your email')
        return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError('Please enter a valid email')
        return
    }

    if ('' === password) {
        setPasswordError('Please enter a password')
        return
    }

    if (password.length < 7) {
        setPasswordError('The password must be 8 characters or longer')
        return
    }
  
    // Check if email has an account associated with it
    checkAccountExists((accountExists: boolean) => {
      // If yes, log in
      if (accountExists) logIn()
      // Else, ask user if they want to create a new account and if yes, then log in
      else if (
        window.confirm(
          'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
        )
      ) {
        logIn()
      }
    })
  }

  // Call the server API to check if the given email ID already exists
const checkAccountExists = (callback: (a: boolean) => void) => {
  fetch(`http://sensolockdev.eastus.cloudapp.azure.com/auth-service/check-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((r) => r.json())
    .then((r) => {
      callback(r?.userExists)
    })
}


// Log in a user using email and password
const logIn = () => {
  fetch(`http://sensolockdev.eastus.cloudapp.azure.com/auth-service/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((r) => r.json())
    .then((r) => {
      if ('success' === r.message) {
        localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
        props.setLoggedIn(true)
        props.setEmail(email)
        goToSearchPage()
      } else {
        window.alert('Wrong email or password')
      }
    })
}

const goToSearchPage = () => {
  navigate('/search')
}

const logOut = () => {
  localStorage.removeItem('user')
  setLoggedIn(false)
}

  return (
    <div className={'mainContainer'}>
      { loggedIn ?
        <div>Your email address is {email}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={goToSearchPage}
          >
            Go To Search Page
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={logOut}
          >
            Log Out
          </Button>
        </div> 
        :
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar> */}
          <Logo/>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="errorLabel">{emailError}</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className="errorLabel">{passwordError}</label>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onButtonClick}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container> }
    </div>
  )
}

export default Login