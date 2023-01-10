import {useEffect, useState} from 'react';

const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const mediaPath = 'media/';

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

export {useMedia};
