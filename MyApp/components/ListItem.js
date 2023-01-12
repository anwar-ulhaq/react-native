import {Text, TouchableOpacity, View} from 'react-native';
import {PropTypes} from 'prop-types';
import React from 'react';
import {Avatar} from '@rneui/themed';
import {Button} from '@rneui/base';

const ListItem = (props) => {

  return (
    <>
      <TouchableOpacity>
        <View
          style={{
            height: 60,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: props?.theme?.colors?.grey4,
            borderRadius: 5,
            alignItems: 'stretch',
            flexDirection: 'row',
          }}
        >
          <View
            style={{flex: 4, flexDirection: 'row', alignItems: 'flex-start'}}>
            <View style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 15,
              marginTop: 15,
            }}>
              <View style={{flex: 0.5}}>
                <Avatar
                  rounded
                  source={props.singleMedia.thumbnails !== undefined ? {
                    uri: 'https://media.mw.metropolia.fi/wbma/uploads/' +
                      props.singleMedia.thumbnails.w160,
                  } : undefined}
                  activeOpacity={0.7}
                />
              </View>
              <View style={{
                flex: 2.5,
                alignContent: 'flex-start',
                flexDirection: 'column',
              }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: props?.theme?.colors?.grey0,
                  }}
                >{props.singleMedia.title}</Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: props?.theme?.colors?.grey0,
                  }}
                >{props.singleMedia.description}</Text>
              </View>
            </View>

            <View
              style={{flex: 1, justifyContent: 'flex-start'}}
            >
              <Button
                title="View"
                buttonStyle={{
                  height: 33,
                  width: 60,
                  backgroundColor: 'rgba(78, 116, 289, 1)',
                  borderRadius: 5,
                  paddingVertical: 5,
                }}
                containerStyle={{
                  width: 200,
                  marginTop: 15,
                  alignItems: 'flex-start',

                }}
                titleStyle={{
                  fontSize: 13,
                  color: 'white',
                }}
                onPress={() => {
                  props.navigation.navigate('Single', {
                    title: props.singleMedia.title,
                    filename: props.singleMedia.filename,
                    description: props.singleMedia.description,
                  });
                }}
              />
            </View>
          </View>

        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: 'rgba(222, 223, 226, 1)',
            marginHorizontal: 20,
            height: 1,
            marginVertical: 10,
          }}
        />
        {/*Or use <Divider inset={true} insetType="right" /> */}
      </TouchableOpacity>
    </>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
