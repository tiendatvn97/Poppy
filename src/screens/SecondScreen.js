import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {observer} from 'mobx-react'
import SecondScreenView from '../views/SecondScreenView';

observer
export default class SecondScreen extends Component {
  static navigationOptions = {
    title: 'Second Screen',
  };

  constructor(props) {
    super(props);
   
  }
  render() {
    return (
      <SecondScreenView/>
    );
  }
}
