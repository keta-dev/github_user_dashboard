import React from 'react';
import Info from '../components/Info';
import User from '../components/User';
import Repos from '../components/Repos';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { loading } = React.useContext(GithubContext);
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loding' />
      </main>
    );
  }
  return (
    <main>
      <Navbar/>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard;