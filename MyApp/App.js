import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import List from './components/List';
import {Settings} from 'react-native-feather';

const backgroundImage = {
  uri: 'https://4.bp.blogspot.com/-jom3bTOOQqs/UnXZ-lOOeGI/AAAAAAAAAF8/WvM_5uXioJI/s1600/tumblr_mn4k71ujcU1s2jqm8o1_1280.jpgg',
};

const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <StatusBar
        backgroundColor="#000000"
        barStyle="light-content"
        style="auto"
      />
      <View style={styles.topContainer}>
        <Settings
          style={styles.settingIcon}
          stroke="gray"
          width={32}
          height={32}
        />
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
        </ImageBackground>
        <Text style={styles.text}>I hate styling</Text>
      </View>
      <View style={styles.bottomContainer}>
        <List/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#000000',
  },
  topContainer: {
    flex: 1,
    borderBottomRightRadius: 72,
    padding: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderBottomRightRadius: 72,
    overflow: 'hidden',
  },
  settingIcon: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    zIndex: 1,
  },
  text: {
    position: 'absolute',
    top: '80%',
    marginLeft: 5,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 48,
    textAlign: 'left',
    backgroundColor: '#1072c2',
    zIndex: 1,
  },
  bottomContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
});

export default App;
