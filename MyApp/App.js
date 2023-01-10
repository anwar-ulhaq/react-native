import {StatusBar} from 'react-native';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator></Navigator>
      <StatusBar style="auto"/>
    </>
  );
};

export default App;
