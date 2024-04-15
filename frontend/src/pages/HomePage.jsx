import React, { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [userprofile, setUserProfile] = useState(null);
  const [repos,setRepos] = useState([]);
  const [loading,setLoading] = useState(false);

  const[sortType,setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async(username="ZAHEED-MOLLA")=>{
    setLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`,{
        headers:{
          authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
        },
      });
      const userProfile = await userRes.json();
      setUserProfile(userProfile);

      const repoRes = await fetch(userProfile.repos_url);
      const repos = await repoRes.json();
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
      setRepos(repos);

      return{userProfile,repos}

    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  },[])

  useEffect(()=> {
    getUserProfileAndRepos();
  },[getUserProfileAndRepos]);

  const onSearch = async(e,username) =>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);


    const {userProfile,repos}= await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) =>{
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    }else if(sortType === "stars"){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    }else if(sortType === "forks"){
      repos.sort((a,b) => b.forks_count- a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos])
  }

  return (
    <div className='m-4'>
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className='flex flex-col lg:flex-row justify-center items-center'>
       {userprofile && !loading &&  <ProfileInfo userProfile={userprofile} />}
        { !loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default HomePage;
