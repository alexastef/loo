import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Logout from './pages/Logout';
import Nav from './components/Nav';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddForm from "./pages/AddForm";
import { StoreProvider } from "./utils/globalState";

function App() {
  return (
    <div>
      <Router>
        <StoreProvider>
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/signup" exact component={Signup} />
            {/* <Route path="/details" exact component={Details} /> */}
            <Route path="/add/:id" component={AddForm} />
          </Switch>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
