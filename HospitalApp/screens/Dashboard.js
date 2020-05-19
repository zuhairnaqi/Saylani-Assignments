import React from "react";
import { View, Text } from "react-native";


class Dashboard extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: "Brown",borderColor : "yellow" }}>
        <Text>Dashboard Screen</Text>
      </View>
    );
  }
}

export default Dashboard;