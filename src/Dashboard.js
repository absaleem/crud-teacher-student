import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Listusers from './Listusers';
import Createuser from './Createuser';
import Createstudent from './Createstudent';
import Liststudents from './Liststudents';

function Dashboard() {
    return (
    <>       
        <h1>Welcome to Dashboard, CRUD WITH STUDENT & TEACHER MANAGEMENT</h1>
        <h2> <Link to="/Createuser" element={<Createuser />}>Create teacher</Link> | &nbsp;
             <Link to="/Listusers" element={<Listusers />}>View teacher</Link> | &nbsp;
             <Link to="/Createstudent" element={<Createstudent />}>Create Student</Link> | &nbsp;
             <Link to="/Liststudents" element={<Liststudents />}>View Students</Link>
        </h2>
    </>
    );
} 

export default Dashboard;