import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Single = ({route, navigation}) => {

  const {title, filename} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  imageContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageStyle: {
    borderRadius: 20,
    padding: 30,
    height: 300,
  },
});

export default Single;
