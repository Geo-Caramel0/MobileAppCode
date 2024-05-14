import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; 
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SetUserDetails = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation(); 

  const handleSaveDetails = async () => {
    try {
      
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      
      alert("User details saved successfully!");
      
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error saving user details: ", error);
      alert("Failed to save user details. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg" }}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="white"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="white"
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="white"
            style={styles.eyeIcon}
            onPress={toggleShowPassword}
          />
        </View>
        <Button title="Save Details" onPress={handleSaveDetails} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "80%",
  },
  passwordInput: {
    flex: 1, 
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});

export default SetUserDetails;




