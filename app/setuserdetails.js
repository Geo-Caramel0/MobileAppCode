import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
} from "react-native";

const SetUserDetails = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSaveDetails = async () => {
    try {
      // Save user details to AsyncStorage
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      // Notify the user that the information has been saved
      alert("User details saved successfully!");
    } catch (error) {
      console.error("Error saving user details: ", error);
      alert("Failed to save user details. Please try again.");
    }
  };

  function saveData() {
    AsyncStorage.setItem("the_data", words);
    Alert.alert("Data was saved");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Save Details" onPress={handleSaveDetails} />
    </View>
  );
};

export default SetUserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
