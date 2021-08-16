import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import AdminConsole from './pages/AdminConsole';
import UserConsole from './pages/UserConsole';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Make a context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Set up Apollo provider 
// Set up routes
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/adminconsole">
              <AdminConsole />
            </Route>
            <Route exact path="/userconsole">
              <UserConsole />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div> 
      </Router>
    </ApolloProvider>
  );
}

export default App;
