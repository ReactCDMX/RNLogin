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
  state = {
    user: undefined
  }

  fbAuth = () => {
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
      .then(currentUser => {
        const {providerData: [{displayName: user}]} = currentUser;
        this.setState({user});
      })
      .catch(error => console.error(error));
  }

  logout = async () => {
    try {
      let signOut = true;
      signOut = await firebase.auth().signOut();
      if (!signOut) this.setState({user: null});
    } catch (e) {
      console.error(error);
    }
  }

  render() {
    const {user} = this.state;
    return (
      <View style={styles.container}>
        { user ?
          <View style={styles.containerUser}>
            <Text style={styles.text}>
              Hola{'\n'}
              <Text style={styles.user}>{user}</Text>
              <Text style={styles.text}>{'\n'}Bienvenido a este demo de @ReactCDMX</Text>
            </Text>
            <TouchableOpacity style={{marginTop: 20}} onPress={this.logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View> :
          <TouchableOpacity onPress={this.fbAuth}>
            <Text>Login with Facebook</Text>
          </TouchableOpacity>
        }
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
  containerUser: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('RNLogin', () => RNLogin);
