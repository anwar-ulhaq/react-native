import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {ActivityIndicator, Alert} from 'react-native';
import PropTypes from 'prop-types';

import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Constant} from '../utilities';

const Upload = ({navigation}) => {

  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const [mediaObject, setMediaObject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {control, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {

    setIsAnimating(false);
    setUpdate(false);

    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(result => {

      if (!result.canceled) {
        setMediaObject(result.assets[0]);
      }
    }).catch(error => {

      console.log('ImagePicker Error: ' + error);
    });
  };

  const onSubmit = async (data) => {

    setIsAnimating(true);

    const formData = new FormData();
    const {uri, type} = mediaObject;
    const fileName = uri.split('/').pop();

    let fileExtension = fileName.split('.').pop();
    if (fileExtension === 'jpg') fileExtension = 'jpeg';

    const mimeType = `${type}/${fileExtension}`;

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('file', {
      uri: uri,
      name: `${fileName}.${fileExtension}`,
      type: mimeType,
    });

    try {

      await postMedia(formData).then(async result => {

        const appTag = {
          file_id: result.file_id,
          tag: Constant.APP_ID,
        };

        console.log('Media TAG: ' + JSON.stringify(appTag));

        await postTag(appTag).then(tagResult => {
          console.log('tag result', tagResult);
        });

        //TODO make separate component
        Alert.alert(
          'Upload Successful',
          'File has been uploaded successfully with File id: ' +
          result.file_id +
          '. Press OK to goto Home screen or Cancel to upload more.', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                setUpdate(true);
                navigation.navigate('Home');
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed.');
                setUpdate(true);
              },
              style: 'cancel',
            },
          ]);
      });

    } catch (error) {
      console.log('Error: ' + error);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    //Empty all fields and disable animation
    setMediaObject(null);
    //rest form data
    reset({
      title: '',
      description: '',
    });
    setIsAnimating(false);
  }, [update]);

  return (
    <Card containerStyle={{borderRadius: 8}}>
      <Card.Title h4 h4Style={{
        fontWeight: '200',
        textAlign: 'center',
      }}>Upload media</Card.Title>

      <Card.Image
        source={{uri: mediaObject?.uri}}
        containerStyle={{
          borderRadius: 8,
          margin: 8,
        }}>
        {/*//TODO Show upload image and disable upload button with same boolean variable
        // While uploading show Indication*/}
        <ActivityIndicator
          animating={isAnimating} // replace with the post indicator
          size={80}
          color={'gray'}
          style={isAnimating ? {
            backgroundColor: '#F5FCFF88',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: mediaObject?.uri ? -1 : 1,
          } : {}}
        />
      </Card.Image>

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          minLength: {
            value: 5,
            message: 'Must be at least 5 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="title"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            //autoCapitalize={'none'}
            errorStyle={{color: 'red'}}
            errorMessage={errors.title && errors.title.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="description"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={'none'}
            //errorStyle={{color: 'red'}}
            //errorMessage={errors.description && 'This field is required'}
          />
        )}
        name="description"/>

      <Button
        title="Select media"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
          margin: 8,
        }}
        onPress={pickImage}
      />

      <Button
        title="Upload"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
          margin: 8,
        }}
        disabled={!mediaObject}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
