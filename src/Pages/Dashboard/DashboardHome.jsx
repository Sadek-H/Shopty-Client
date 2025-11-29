import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';

const DashboardHome = () => {
   const {role} = useContext(AuthContext);
   console.log(role);
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
};

export default DashboardHome;