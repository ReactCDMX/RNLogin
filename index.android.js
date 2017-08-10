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
  TouchableOpacity,
  View
} from 'react-native';
import {
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';
import RNFirebase from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyCnfbQ2Is1hODGbF_nKGCCyzBVSchIy95o",
  authDomain: "rnlogin-822e7.firebaseapp.com",
  databaseURL: "https://rnlogin-822e7.firebaseio.com",
  projectId: "rnlogin-822e7",
  storageBucket: "rnlogin-822e7.appspot.com",
  messagingSenderId: "818148562943"
};

const firebase = RNFirebase.initializeApp(config);

export default class RNLogin extends Component {
  _fbAuth() {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject('The user cancelled the login with Facebook');
        } else {
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then(({accessToken}) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then(currentUser => console.info(JSON.stringify(currentUser.toJSON())))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth}>
          <Text>Login with Facebook</Text>
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
