/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';

export default class RNLogin extends Component {
  _fbAuth() {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          console.log('Login was Cancelled');
        } else {
          console.log(`Login was a success ${result.grantedPermissions.toString()}`)
        }
      }, error => consle.error(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth()}>
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNLogin', () => RNLogin);
