import LoginPage from './components/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import SignUp from './components/register';
import ForgotPass from './components/forgottenPass';
import TaskList from './components/profile/taskList';
import UserDetails from './components/profile/userDetails';
import TaskForm from './components/profile/taskForm';

 
function App() {

  return (

    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <LoginPage />
              </Route>
              <Route path="/sign-up">
                <SignUp/>
              </Route>
              <Route path="/forgot-pass">
                <ForgotPass/>
              </Route>
              <Route path="/tasks">
                <TaskList/>
              </Route>
              <Route path="/profile">
                <UserDetails/>
              </Route>
              <Route path="/create-task">
                <TaskForm/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
