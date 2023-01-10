import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PropTypes} from 'prop-types';
import React from 'react';

const ListItem = (props) => {

  return (<>
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => {

        props.navigation.navigate('Single', {
          title: props.singleMedia.title,
          filename: props.singleMedia.filename,
        });
      }}>
      <Image
        style={styles.touchableImage}
        source={props.singleMedia.thumbnails !== undefined ? {
          uri: 'https://media.mw.metropolia.fi/wbma/uploads/' +
            props.singleMedia.thumbnails.w160,
        } : undefined}
      />
      <View style={styles.touchableText}>
        <Text style={styles.textTitle}>{props.singleMedia.title}</Text>
        <Text
          style={styles.textDescription}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  </>);
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#b6b6b6',
    marginTop: 4,
    marginBottom: 4,
  },
  touchableImage: {
    flex: 1,
    padding: 30,
    flexWrap: 'wrap',
  },
  touchableText: {
    flex: 2,
    padding: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textDescription: {},
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
