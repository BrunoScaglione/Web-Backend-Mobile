import { StatusBar } from 'expo-status-bar';
import React, { useEffect} from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, Text, View } from 'react-native';

// pro update over the air:
// >> yarn expo publish 

export default function App() {
  // exemplo para fazer o updateover the air 
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()
     // ve se tem updates 
      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        // faz update
        await Updates.reloadAsync()
      }
    }

    updateApp();
  }, [])





  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
