import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { firebaseConfig } from './firebaseConfig.js';
import BottomTabNavigator from './src/components/BottomTabNavigator.jsx';
import store from './src/redux/store.jsx';
 
initializeApp(firebaseConfig)

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <BottomTabNavigator/>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});