import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import useApiRequest from './useApiRequest';

// Define the global styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    font-family: Arial, sans-serif;
  }
`;

// Define the light and dark themes
const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
};

const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#ffffff',
};

// Define the navigation bar
const Navbar = styled.nav`
  background-color: ${props => props.theme.backgroundColor};
  padding: 16px;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li {
    margin-right: 16px;
  }

  a {
    color: ${props => props.theme.textColor};
    text-decoration: none;
  }
`;

// Define the page components
const Home = () => <h2>Home</h2>;

const About = () => <h2>About</h2>;

const Users = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data: users, error, loading } = useApiRequest(
    'https://jsonplaceholder.typicode.com/users'
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  // Filter the users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2>Users</h2>
      <input type="text" placeholder="Search by name" onChange={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <label>
                <input type="checkbox" onChange={toggleTheme} />
                Dark Mode
              </label>
            </li>
          </ul>
        </Navbar>
       
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
       
      </Router>
    </ThemeProvider>
  );
};

export default App;
