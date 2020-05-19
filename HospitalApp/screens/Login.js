import React from "react";
import { View, Text, Button } from "react-native";


class Login extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: "green",borderColor : "brown" }}>
        <Text>Login Screen</Text>
        <Button 
        title = "Dashboard"
        onPress={()=> {this.props.navigation.navigate("Dashboard")}}/>
      </View>
    );
  }
}

export default Login;