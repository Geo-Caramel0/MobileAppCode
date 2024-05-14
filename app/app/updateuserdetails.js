import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UpdateUserDetails = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [updateType, setUpdateType] = useState("username"); 
  const navigation = useNavigation();

  const saveDetails = async () => {
    console.log("Saving details...");
    try {

      if (!(name || password)) {
        Alert.alert("Error", "Please provide either name or password to update.");
        return;
      }
  
      
      if (updateType === "username" && name) {
        await AsyncStorage.setItem("username", name);
        Alert.alert("Success", "Your username has been updated successfully.");
        
        navigation.navigate("Home");
      }
      
      
      if (updateType === "password" && password) {
        await AsyncStorage.setItem("password", password);
        Alert.alert("Success", "Your password has been updated successfully.");
        
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", "Failed to update information.");
    }
  };
  
  
  <Button title="Update" onPress={saveDetails} />
  
  

  const resetFields = () => {
    console.log("Resetting fields...");
    
    setName("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
      }}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={[styles.pageTitle, styles.whiteText]}>Update User</Text>
        <Text style={[styles.text, styles.whiteText]}>
          Choose what you want to update:
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Update Username"
            onPress={() => setUpdateType("username")}
          />
          <Button
            title="Update Password"
            onPress={() => setUpdateType("password")}
          />
        </View>
        {updateType === "username" ? (
          <TextInput
            style={styles.input}
            placeholder="New Username"
            value={name}
            onChangeText={(val) => setName(val)}
            placeholderTextColor="white"
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
            placeholderTextColor="white"
          />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={resetFields} />
          <Button title="Save" onPress={saveDetails} />
        </View>
        <Text style={[styles.text, styles.whiteText]}>
          Note: You can update either your username or password, not both at
          once.
        </Text>
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
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  whiteText: {
    color: "white",
  },
});


