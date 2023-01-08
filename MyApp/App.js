import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <List/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  touchableOpacity: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#404040',
    margin: 8,
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

export default App;
