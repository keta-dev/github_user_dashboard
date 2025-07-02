import React, { useState } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()  //by doing this you have your context

// Access to Provider, Consumer - GithubContext.Provider

const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepo] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepo(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    handleRequest();
    setLoading(false);
  };

  const handleRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  
  // useEffect = (handleRequest, []);

  // useEffect(() => {
  //   searchGithubUser('john-smilga');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, request, error, searchGithubUser, loading }}>
      {children}
    </GithubContext.Provider>
  )
};

export {GithubProvider, GithubContext};