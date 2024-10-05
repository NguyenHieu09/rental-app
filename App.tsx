
// App.tsx
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/store';
import Navigation from './src/navigation/navigation';

// Suppress the specific warning
LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);


export default function App() {
  const [fontsLoaded] = useFonts({
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});