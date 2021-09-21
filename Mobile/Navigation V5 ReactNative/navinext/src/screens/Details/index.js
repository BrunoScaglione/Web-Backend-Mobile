import React from 'react';
import {View, Text, Button} from 'react-native';

function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
        <Button title="Go to Something-Settings" onPress={() => navigation.navigate('Something', {
          screen: 'Something - Settings'
        })} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }


  export default DetailsScreen;

  