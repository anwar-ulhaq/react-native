import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Modify = ({route, navigation}) => {

  const {title, filename, description, file_id} = route.params;

  const {update, setUpdate} = useContext(MainContext);
  const [mediaObject, setMediaObject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {updateMedia} = useMedia();

  const {control, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onSubmit = async (data) => {

    setIsAnimating(true);
    const userToken = await AsyncStorage.getItem('userToken');

    try {
      await updateMedia(file_id, data, userToken).then(() => {
        setUpdate(!update);
        navigation.goBack();
      });
    } catch (error) {
      console.log('Error: ' + error);
      setIsAnimating(false);
    }
  };

  return (
    <Card containerStyle={{borderRadius: 8}}>
      <Card.Title h4 h4Style={{
        fontWeight: '200',
        textAlign: 'center',
      }}>Modify media</Card.Title>

      <Card.Image
        source={{
          uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
        }}
        containerStyle={{
          borderRadius: 8,
          margin: 8,
        }}>
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
          />
        )}
        name="description"/>

      <Button
        title="Save changes"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
          margin: 8,
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );

};

Modify.propTypes = {
  navigation: PropTypes.object,
};

export default Modify;
