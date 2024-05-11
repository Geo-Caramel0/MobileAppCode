import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateUserDetails = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const saveDetails = async () => {
    try {
      // Overwrite existing name and password with new ones
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("password", password);
      // Notify the user that the information has been saved
      Alert.alert("Success", "Your information has been saved.");
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", "Failed to save information.");
    }
  };

  const resetFields = () => {
    // Clear input fields
    setName("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
      }}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={[styles.pageTitle, styles.whiteText]}>Update User</Text>
        <Text style={[styles.text, styles.whiteText]}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(val) => setName(val)}
          placeholderTextColor="white"
        />
        <Text style={[styles.text, styles.whiteText]}>
          Enter your password:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          placeholderTextColor="white"
        />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={resetFields} />
          <Button title="Save" onPress={saveDetails} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default UpdateUserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 100,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Opaque background color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  whiteText: {
    color: "white",
  },
});
