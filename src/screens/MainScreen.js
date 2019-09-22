import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
export default class MainScreen extends Component{
  static navigationOptions = {
    title: 'Main Screen',
  };

  onPressButton() {
    const {navigate} = this.props.navigation;
    navigate('Second');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.onPressButton()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Go to Second Screen!!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#07a4ee',
    width: Dimensions.get('window').width * 0.8,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});