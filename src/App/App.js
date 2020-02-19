/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const ASYNC_STORAGE_KEY = '@MySuperStore:key';

type AppProps = {};

type AppState = {
  loading: boolean,
  storageText: ?String,
};

class App extends React.Component<AppProps, AppState> {
  state = {
    loading: true,
    storageText: null,
  };

  componentDidMount() {
    this.loadAsyncStorage();
  }

  loadAsyncStorage = () => {
    this.setState({loading: true, storageText: null}, async () => {
      const message = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      this.setState({loading: false, storageText: message});
    });
  };

  onClear = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
    this.loadAsyncStorage();
  };

  onPress = () => {
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, 'I Like to Save It');
    this.loadAsyncStorage();
  };

  render() {
    const {loading, storageText} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.asyncMessageContainer}>
            <Text>saved in async-storage:</Text>
            <View style={styles.asyncMessage}>
              {!loading ? (
                <Text style={styles.asyncMessageText}>
                  {storageText || '[null]'}
                </Text>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
          <Button
            title="set storage to 'I Like to Save It'"
            onPress={this.onPress}
          />
          <Button title="clear storage" color="red" onPress={this.onClear} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  asyncMessageContainer: {
    height: 200,
  },
  asyncMessage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  asyncMessageText: {
    fontSize: 40,
  },
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: 'green',
  },
});

export default App;
