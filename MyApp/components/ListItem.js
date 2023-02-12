import {PropTypes} from 'prop-types';
import React from 'react';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {

  return (

    <RNEListItem>
      <Avatar
        rounded
        size="large"
        source={singleMedia?.thumbnails !== undefined ? {
          uri: 'https://media.mw.metropolia.fi/wbma/uploads/' +
            singleMedia.thumbnails.w160,
        } : undefined}
        activeOpacity={0.7}
      />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia?.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={3}>
          {singleMedia?.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        title="View"
        buttonStyle={{
          height: 33,
          width: 60,
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 5,
          paddingVertical: 5,
        }}
        titleStyle={{
          fontSize: 13,
          color: 'white',
        }}
        onPress={() => {
          navigation.navigate('Single', singleMedia);
        }}
      />
    </RNEListItem>);
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
