import React from 'react';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';

const HomePage = () => {
  return (
    <div className='m-4'>
      <Search />
      <SortRepos />
      <div className='flex flex-col lg:flex-row justify-center items-center'>
        <ProfileInfo />
        <Repos />
      </div>
    </div>
  );
}

export default HomePage;