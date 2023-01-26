import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Card} from '@rneui/themed';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';

const Single = ({route, navigation}) => {

  const {title, filename, description} = route.params;

  return (
    <Card containerStyle={{borderRadius: 8}}>
      <Card.Image
        style={{padding: 0}}
        source={{
          uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
        }}
        containerStyle={{borderRadius: 8}}
        PlaceholderContent={<ActivityIndicator/>}
      />
      <Card.Title h4 h4Style={{
        fontWeight: '300',
        textAlign: 'left',
      }}>{title}</Card.Title>
      <CardDivider/>
      <Text style={{marginBottom: 10}}>
        {description}
      </Text>
    </Card>
  );
};

export default Single;
