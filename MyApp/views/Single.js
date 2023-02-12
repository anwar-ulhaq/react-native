import React, {useContext, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, Badge, Card, Icon, ListItem, Text} from '@rneui/themed';
import {Video} from 'expo-av';
import {
  CardFeaturedSubtitle,
} from '@rneui/base/dist/Card/Card.FeaturedSubtitle';
import {MainContext} from '../contexts/MainContext';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route, navigation}) => {

  const {
    title, filename, description, media_type,
    user_id, file_id,
  } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [toggleCommentsList, setToggleCommentsList] = useState(false);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const {user} = useContext(MainContext);
  const {getUserById} = useUser();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();

  const getOwner = async () => {

    try {
      const token = await AsyncStorage.getItem('userToken');
      await getUserById(user_id, token).
        then(mediaOwner => setOwner(mediaOwner));
    } catch (error) {
      console.log('Error: ' + error);
    }

  };

  const getMediaLikes = async () => {
    setUserLikesIt(false);
    await getFavouritesByFileId(file_id).then(likes => {
      setLikes(likes);
      for (const like of likes) {
        if (like.user_id === user.user_id) {
          setUserLikesIt(true);
          break;
        }
      }
      setNoOfLikes(likes.length);
    });
  };

  const likeFile = async () => {
    try {
      console.log('Like Media');
      const userToken = await AsyncStorage.getItem('userToken');
      await postFavourite(file_id, userToken).then(async () => {
        await getMediaLikes();
      });

    } catch (error) {

      console.log(error);
    }
  };

  const dislikeFile = async () => {
    console.log('Dis-Like Media');

    try {
      const userToken = await AsyncStorage.getItem('userToken');

      await deleteFavourite(file_id, userToken).then(async () => {
        console.log('userToken: ' + userToken);
        await getMediaLikes();
      });

    } catch (error) {

      console.log(error);
    }
  };

  const toggleMediaLike = () => {
    userLikesIt ? dislikeFile() : likeFile();
  };

  useEffect(() => {
    getOwner().then(() => {
      console.log('Owner Fetched: ' + JSON.stringify(owner));
    });
    getMediaLikes().then(() => {
      console.log('Media likes Fetched: ' + JSON.stringify(likes));
    });
  }, []);

  return (
    <Card containerStyle={{padding: 0, borderRadius: 8}}>
      <View style={{
        padding: 8,
        paddingLeft: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
          }}
          activeOpacity={0.7}
        />
        <Card.Title h4 h4Style={{
          paddingLeft: 8,
          paddingTop: 8,
          fontWeight: '300',
          textAlign: 'left',
        }}>{owner?.username}</Card.Title>

      </View>
      {media_type === 'image' ?
        <Card.Image
          style={{
            padding: 0,
            width: '100%',
            height: 400,
          }}
          source={{
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
          }}
        /> :
        <Video
          ref={video}
          style={{
            //borderRadius: 8,
            alignSelf: 'center',
            width: '100%',
            height: 400,
          }}
          source={{
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping={false}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />}
      <View>
        <Card.Divider/>
        <Card.Title>{title}</Card.Title>
        {description && (
          <CardFeaturedSubtitle style={{marginLeft: 24, marginRight: 24}}>
            <Text>{description}</Text>
          </CardFeaturedSubtitle>
        )}
      </View>
      <View style={{
        padding: 8,
        paddingLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',

      }}>

        <View>
          <Icon

            solid
            color="red"
            raised
            reverse={noOfLikes === 0}
            name="heart"
            type="font-awesome"
            onPress={toggleMediaLike}
          />
          {noOfLikes === 0 ? <></> : <Badge
            status="error"
            value={noOfLikes}
            containerStyle={{
              position: 'absolute',
              left: 48,
              top: 5,
            }}
          />}
        </View>

        <Icon
          solid
          raised
          name={toggleCommentsList ?
            'chevron-down' :
            'chevron-up'} //chevron-circle-down
          type="font-awesome"
          onPress={() => setToggleCommentsList(!toggleCommentsList)}

        />


      </View>

      {toggleCommentsList ?
        <></>
        :
        <View style={{
          height: 120,
          width: '100%',
          paddingLeft: 8,
          paddingRight: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
          {/*TODO Replace with real data*/}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={[{}, {}, {}, {}]}
            renderItem={({}) => <ListItem>
              <Avatar
                rounded
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/40.jpg',
                }}
                size="medium"
              />
              <ListItem.Content>
                <ListItem.Title>Commenter</ListItem.Title>
                <ListItem.Subtitle numberOfLines={3}>
                  This is a very long comment ............
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>}
          />
        </View>

      }

    </Card>
  );
};

export default Single;
