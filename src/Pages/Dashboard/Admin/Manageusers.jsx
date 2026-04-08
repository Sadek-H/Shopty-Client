import React, { use } from 'react';
import { useLoaderData } from 'react-router';

const Manageusers = () => {
    const users = useLoaderData();
    console.log(users);
    return (
        <div>
            
        </div>
    );
};

export default Manageusers;