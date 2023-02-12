import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_ID} from '../utilities';

const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const mediaPath = 'media/';
const logInPath = 'login/';
const usersPath = 'users/';
const tagPath = 'tags/';
const favouritesPath = 'favourites/';
const filePath = 'file/';

// TODO make use of this function for all fetches
const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

// TODO make a common loadMedia
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

  //TODO make a common loadMedia
  const getUserMedia = async (userToken) => {
    const options = {
      headers: {
        'x-access-token': userToken,
      },
    };
    try {
      return await fetch(baseUrl + mediaPath + 'user', options).
        then(response => response.json().then(async result => {
            return await Promise.all(result.map(async (item, index) => {
              return await fetch(baseUrl + mediaPath + item.file_id).
                then(mediaResponse => mediaResponse.json());
            }));
          },
          error => console.log(error.message),
        ));
    } catch (error) {
      throw new Error('getUserMedia error, ' + error.message);
    }
  };

  const deleteMedia = async (fileId, userToken) => {
    const options = {
      method: 'delete',
      headers: {
        'x-access-token': userToken,
      },
    };
    try {
      return await doFetch(baseUrl + mediaPath + fileId, options);
    } catch (error) {
      throw new Error('deleteMedia error, ' + error.message);
    }
  };

  const updateMedia = async (fileId, newData, userToken) => {
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
      return await doFetch(baseUrl + mediaPath + fileId, options);
    } catch (error) {
      throw new Error('updateMedia error, ' + error.message);
    }
  };

  return {mediaArray, postMedia, getUserMedia, deleteMedia, updateMedia};
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

  const getUserById = async (id, userToken) => {

    try {
      const response = await fetch(baseUrl + usersPath + id, {
        headers: {'x-access-token': userToken},
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.json().message);
      }
    } catch (error) {
      throw new Error('getUserById, ' + error.message);
    }
  };

  return {
    getUserByToken,
    postUser,
    getUserAvatar,
    checkUsername,
    updateUser,
    getUserById,
  };
};

//TODO make a common loadMedia
const useTag = (update) => {

  const [mediaArray, setMediaArray] = useState([]);

  const getAppFiles = async () => {

    try {
      return await fetch(baseUrl + tagPath + APP_ID).
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

    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };
  return {mediaArray, getAppFiles, postTag};
};

const useFavourite = () => {

  const postFavourite = async (fileId, userToken) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': userToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + favouritesPath, options);
    } catch (error) {
      throw new Error('posFavourite: ' + error.message);
    }
  };

  const getFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + favouritesPath + filePath + fileId);
    } catch (error) {
      throw new Error('getFavouriteByFileId error, ' + error.message);
    }
  };

  const deleteFavourite = async (fileId, userToken) => {
    const options = {
      method: 'delete',
      headers: {
        'x-access-token': userToken,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('deleteFavourite error, ' + error.message);
    }
  };

  return {
    postFavourite,
    getFavouritesByFileId,
    deleteFavourite,
  };
};

export {useMedia, useLogin, useUser, useTag, useFavourite};
