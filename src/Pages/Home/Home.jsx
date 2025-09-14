import React from 'react';
import Banner from '../../Component/Banner';
import CatCards from '../CatCards';
import Newarrivals from './Newarrivals';

const Home = () => {
    return (
        <div>
            <Banner/>
            <CatCards/>
            <Newarrivals/>
        </div>
    );
};

export default Home;