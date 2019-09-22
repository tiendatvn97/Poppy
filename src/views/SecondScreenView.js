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
import { observer, inject } from "mobx-react";

@inject('secondScreenStore')
@observer
export default class SecondScreen extends Component {
  static navigationOptions = {
    title: 'Second Screen',
  };

  // random background color
  randomBgColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    this.props.secondScreenStore.setBgColor(`rgb(${r},${g},${b})`);

    // // this.props.secondScreenStore.setBgColor(`rgb(${r}, ${g}, ${b})`);
    ToastAndroid.show(this.props.secondScreenStore.bgColor, ToastAndroid.SHORT);
  }

  componentWillUnmount() {
    // this.props.secondScreenStore.reset();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.secondScreenStore.bgColor
      }]}>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => {
            this.randomBgColor();
          }}
        >
          <Text style={styles.buttonText}>Change Color</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>Current Color: {this.props.secondScreenStore.bgColor}</Text>
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