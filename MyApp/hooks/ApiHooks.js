import {useEffect, useState} from 'react';

const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const mediaPath = 'media/';
const logInPath = 'login/';
const usersPath = 'users/';

const useMedia = () => {

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {

      return await fetch(baseUrl + mediaPath).
        then(response => response.json().then(async result => {
            return await Promise.all(result.map(async (item, index) => {
              return await fetch(baseUrl + mediaPath + item.file_id).
                then(mediaResponse => mediaResponse.json());
            }));
          },
          error => console.log(error.message),
        ));
    } catch (e) {
      console.log('Error loading media', e);
    }
  };

  useEffect(() => {
    loadMedia().then(media => {
      setMediaArray(media);
    });
  }, []);

  return {mediaArray};
};

const useLogin = () => {

  const postLogin = async (userCredentials) => {

    const options = {
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };

    try {
      return await fetch(baseUrl + logInPath, options).
        then(loginResponse => loginResponse.json());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {

  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postUser = async (userData) => {

    const options = {

      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      return await fetch(baseUrl + usersPath, options).
        then(loginResponse => loginResponse.json());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken, postUser};
};

export {useMedia, useLogin, useUser};
