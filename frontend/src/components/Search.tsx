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
import SearchIcon from '@mui/icons-material/Search';
import Logo from './Logo';

const Search = (props: {
  loggedIn: boolean,
  email: string
}) => {
  const { loggedIn, email } = props
  const [customerFirstName, setCustomerFirstName] = useState('')
  const [customerLastName, setCustomerLastName] = useState('')

  const navigate = useNavigate()

  async function getMatchingCustomers(firstName: string, lastName: string) {
    const response = await fetch(`http://sensolockdev.eastus.cloudapp.azure.com/auth-service/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'firstName': firstName, 'lastName': lastName }),
    })
    
    if (response.status === 200) {
        var data = await response.json()
        return data
    } else {
        window.alert('Error searching for customers')
        return null
    }
  }

  async function onSearchButtonClick() {
    
    var potentialCustomers = await getMatchingCustomers(customerFirstName, customerLastName)
    if (potentialCustomers) {
        if (potentialCustomers?.length > 0)
          navigate('/results', { state: {customers: potentialCustomers}})
        else {
          window.alert(`There are no matching records.`)
        }
    }
}

  return (
    <div className="mainContainer">
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > <Logo />
          <Typography variant="h5">Search</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="customerFirstName"
              label="First Name"
              name="customerFirstName"
              autoFocus
              value={customerFirstName}
              onChange={(ev) => setCustomerFirstName(ev.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="customerLastName"
              name="customerLastName"
              label="Last Name"
              value={customerLastName}
              onChange={(ev) => setCustomerLastName(ev.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSearchButtonClick}
            >
              Search for Customers
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Search
