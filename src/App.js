import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Listusers from './Listusers';
import Createuser from './Createuser';
import Edituser from './Edituser';
import Liststudents from './Liststudents';
import Createstudent from './Createstudent';
import Editstudent from './Editstudent';

function App() {
    return (
    <div>
      
    <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="Listusers" element={ <Listusers/> } />
        <Route path="Createuser" element={ <Createuser/> } />
        <Route path="Edituser/:userId" element={ <Edituser/> } />
        <Route path="Createstudent" element={ <Createstudent/> } />
        <Route path="Editstudent/:userId" element={ <Editstudent/> } />
        <Route path="Liststudents" element={ <Liststudents/> } />
      </Routes>
    </div>
  );
} 

export default App;