import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Campaigns from './components/pages/Campaigns';
import Profile from './components/pages/Profile';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Write from './components/pages/Write';
import Post from './components/pages/Post';
import sucessForm from './components/accountBox/FormSuccess';
import { AuthContext } from "./Context/AuthContext";
import axios from 'axios';


function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {

    axios.get("http://localhost:5000/auth/verification", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });


  }, []);


  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />

          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/campaigns' exact component={Campaigns} />
            <Route path='/post/:id' exact component={Post} />
            {!authState.status && <Route path='/sign-up' exact component={SignUp} />}
            {!authState.status && <Route path='/login' exact component={Login} />}
            <Route path='/my-profile' exact component={Profile} > {authState.status ? (<Profile />) : (<Login />)}</Route>
            <Route path='/write' exact component={Write} >{authState.status ? (<Write />) : (<Login />)}</Route>
            <Route path='/success-form' exact component={sucessForm} />

          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
