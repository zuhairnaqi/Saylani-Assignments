// In App.js in a new project

import React from "react";
import { View, Text ,Button} from "react-native";


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: "blue",borderColor : "Yellow" }}>
        <Text>Home Screen</Text>

        
        <Button 
        title = "Login"
        onPress={()=> {this.props.navigation.navigate("Login")}}/>
      </View>
    );
  }
}

export default HomeScreen;