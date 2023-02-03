import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant} from '../utilities';

const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const mediaPath = 'media/';
const logInPath = 'login/';
const usersPath = 'users/';
const tagPath = 'tags/';

const useMedia = (update) => {

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
  }, [update]);

  const postMedia = async (formData) => {

    const userToken = await AsyncStorage.getItem('userToken');

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': userToken,
      },
      body: formData,
    };

    try {
      return await fetch(baseUrl + mediaPath, options).
        then(response => response.json());
    } catch (error) {
      console.log('postMedia' + error.message);
    }
  };

  return {mediaArray, postMedia};
};

const useLogin = () => {

  const postLogin = async (userCredentials) => {

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

  const updateUser = async (newData) => {

    console.log('Users new data: ' + JSON.stringify(newData));

    const userToken = await AsyncStorage.getItem('userToken');

    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify(newData),
    };

    try {
      const response = await fetch(baseUrl + usersPath, options);
      //.then(userUpdateResponse => userUpdateResponse.json());
      console.log('user update response: ' + JSON.stringify(response));
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.json().message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserAvatar = async (avatarName) => {
    try {
      return await fetch(baseUrl + tagPath + avatarName).
        then(tagResponse => tagResponse.json());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      return await fetch(baseUrl + usersPath + 'username/' + username).
        then(usernameResponse => usernameResponse.json(),
        );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken, postUser, getUserAvatar, checkUsername, updateUser};
};

const useTag = (update) => {

  const [mediaArray, setMediaArray] = useState([]);

  const getAppFiles = async () => {

    try {
      return await fetch(baseUrl + tagPath + Constant.APP_ID).
        then(response => response.json().then(async result => {
            return await Promise.all(result.map(async (item, index) => {
              return await fetch(baseUrl + mediaPath + item.file_id).
                then(mediaResponse => mediaResponse.json());
            }));
          },
          error => console.log(error.message),
        ));
    } catch (e) {
      console.log('Error loading tagged media', e);
    }
  };

  useEffect(() => {
    getAppFiles().then(media => {
      setMediaArray(media);
    });
  }, [update]);

  const postTag = async (data) => {

    const token = await AsyncStorage.getItem('userToken');

    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await fetch(baseUrl + tagPath, options).
        then(tagResponse => tagResponse.json());
      ;
    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };
  return {mediaArray, getAppFiles, postTag};
};

export {useMedia, useLogin, useUser, useTag};
