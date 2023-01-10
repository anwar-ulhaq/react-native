import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import List from './../components/List';

const Home = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <List navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Home;
