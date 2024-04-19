import React from 'react'
import { useNavigate } from 'react-router-dom'
import background from "./img/Sensologo.png";

const Home = (props: {
    loggedIn: boolean,
    email: string,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { loggedIn, email, setLoggedIn } = props
  const navigate = useNavigate()

  const onLoginButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  const goToSearchPage = () => {
    if (loggedIn) {
      navigate('/search')
    } else {
      window.confirm(
        'Please log in to continue to the search page',
      )
    }
  }

  return (
    <div className="mainContainer" style={{ 
      backgroundImage: background 
    }}>
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
      {loggedIn ? 
        <div className={'buttonContainer'}>
          <input
            className={'inputButton'}
            type="button"
            onClick={goToSearchPage}
            value='Go to search'
          />
        </div> : null
      }
    </div>
  )
}

export default Home