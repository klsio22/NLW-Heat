import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { UserPhoto } from "../UserPhoto";
import LogoSvg from "../../assets/logo.svg";

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LogoSvg />

      <View style={styles.logoutButton}>

        <TouchableOpacity>
          <Text style={styles.logoutText}> Sair </Text>
        </TouchableOpacity>

        <UserPhoto imageUri="https://avatars.githubusercontent.com/u/53840467?s=400&u=6eb273676eae943abb826955c97b8676f818b3f7&v=4" />
      </View>


      </View>
    );
  }
}
