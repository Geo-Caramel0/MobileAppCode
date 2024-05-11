import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

const StoreNewPasswordScreen = () => {
  const [type, setType] = useState("");
  const [shortName, setShortName] = useState("");
  const [websiteOrDevice, setWebsiteOrDevice] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const savePassword = () => {
    // Here you would implement the logic to save the password to the database
    // For demonstration purposes, let's just display an alert
    Alert.alert("Success", "Password information saved successfully");
  };

  const resetFields = () => {
    // Clear input fields
    setType("");
    setShortName("");
    setWebsiteOrDevice("");
    setUsername("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
      }}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={[styles.label, styles.whiteText]}>Type:</Text>
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Type (Device or Online Service)"
            value={type}
            onChangeText={setType}
            placeholderTextColor="white"
          />
          <Text style={[styles.label, styles.whiteText]}>Short Name:</Text>
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Short Name"
            value={shortName}
            onChangeText={setShortName}
            placeholderTextColor="white"
          />
          <Text style={[styles.label, styles.whiteText]}>
            Website or Device:
          </Text>
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Website or Device"
            value={websiteOrDevice}
            onChangeText={setWebsiteOrDevice}
            placeholderTextColor="white"
          />
          <Text style={[styles.label, styles.whiteText]}>Username:</Text>
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="white"
          />
          <Text style={[styles.label, styles.whiteText]}>Password:</Text>
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor="white"
          />
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={resetFields} />
            <Button title="Save" onPress={savePassword} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Opaque background color
  },
  whiteText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default StoreNewPasswordScreen;
