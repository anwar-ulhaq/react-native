import React from 'react';
import {ActivityIndicator, SafeAreaView, Text} from 'react-native';
import {Card} from '@rneui/themed';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';

const Single = ({route, navigation}) => {

  const {title, filename, description} = route.params;

  return (
    <SafeAreaView>
      <Card>
        <Card.Image
          style={{padding: 0}}
          source={{
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + filename,
          }}
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
    </SafeAreaView>
  );
};

export default Single;
