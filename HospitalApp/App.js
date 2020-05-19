import React from 'react';
import { StyleSheet, Text, View, Button,Alert } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator } from "react-navigation";
import HomeScreen from './screens/Home'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import firebase from './config/Firebase'

export default class App extends React.Component {
  constructor(props){
    super(props);
    // Initialize Cloud Firestore through Firebase
    // Disable deprecated features
    // db.settings({
      //   timestampsInSnapshots: true
      // });
    }
    
    async loginWithFacebook() {
      try {
        const {type,token,expires,permissions,declinedPermissions} = await Expo.Facebook.logInWithReadPermissionsAsync('363559464223810', {permissions: ['public_profile']});
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const result = await response.json();
          const fbName = result.name;
          const fbId = result.id;
          console.log('response ==> ',fbName + fbId);
          Alert.alert('Logged in!', `Hi ${fbName}`);
          // firebase.database().ref('users/' + fbId).set({
          //   name: fbName,
          //   id: fbId
          // });
          const db = firebase.firestore();
          db.collection("meetingSet").doc(fbId).update({
            name : fbName,
            id : fbId
            })
            .then( () => {
              console.log('authentication successfully done!')
              })
            .catch( error => {
                console.error("Error updating document: ", error);
            });
          //   const credential = firebase.auth.FacebookAuthProvider.credential(token)
          // firebase.auth().signInWithCredential(credential).catch((error) => {
            //   console.log(error);
            // })
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }
      render() {
        return (
          <View style={{flex : 1}}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
          onPress={this.loginWithFacebook}
          title="Login with Facebook"
          color="blue"
          accessibilityLabel="Learn more about this purple button"
          />
        <Navigation/>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: Login
  },
  Dashboard: {
    screen: Dashboard
  }
});

const TabNavigator = createMaterialTopTabNavigator({
  Home: AppNavigator,
  Settings: Dashboard,
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: TabNavigator,
  },
  Notifications: {
    screen: Dashboard,
  },
});


const Navigation = createAppContainer(MyDrawerNavigator);


