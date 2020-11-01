import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import { Fumi } from "react-native-textinput-effects";
import { FontAwesome } from "@expo/vector-icons";
import chat from "../assets/chat.jpg";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const submitHandler = () => {
    navigation.navigate("Chat", {
      username: username,
      room: room,
    });
    setUsername("");
    setRoom("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.circle}></View>
      <View>
        <Image source={chat} style={styles.img} />
      </View>
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Username</Text>
        <Fumi
          iconClass={FontAwesome}
          iconName={"user"}
          iconColor={"dodgerblue"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
        />
        <Text style={styles.header}>Room ID</Text>
        <Fumi
          iconClass={FontAwesome}
          iconName={"user"}
          iconColor={"dodgerblue"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          value={room}
          onChangeText={(text) => setRoom(text)}
          style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Continue"
          color="dodgerblue"
          disabled={!username}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  circle: {
    backgroundColor: "white",
    width: 550,
    height: 500,
    borderRadius: 500 / 2,
    position: "absolute",
    left: -120,
    top: -40,
  },
  img: {
    height: 100,
    width: 100,
    left: 160,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    color: "#514E5A",
    marginTop: 15,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    top: 150,
  },
});
