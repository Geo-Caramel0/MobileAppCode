import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import SetUserDetails from "./setuserdetails";
import GeneratePasswordScreen from "./generatepassword";

const Drawer = createDrawerNavigator();

const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const white = "white";
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");

      
      if (username === storedUsername && password === storedPassword) {
       
        onLoginSuccess(storedUsername);
        Alert.alert("Login Successful!");
      } else {
        
        Alert.alert("Incorrect username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error while logging in: ", error);
      
      Alert.alert("Error while logging in. Please try again later.");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Create Account");
  };

  const handleGeneratePassword = () => {
    navigation.navigate("Generate Password");
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Login"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <ImageBackground
            source={{ uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg" }}
            resizeMode="cover"
            style={styles.container}
          >
            <View style={styles.overlay}>
              <Text style={[styles.appName, { color: white }]}>Pass Guard</Text>
              <Text style={[styles.welcomeText, { color: white }]}>Welcome User</Text>
              <View style={styles.credentialsContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  placeholderTextColor={white}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor={white}
                />
              </View>
              <Button title="Login" onPress={handleLogin} />
            </View>
          </ImageBackground>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Generate Password"
        component={GeneratePasswordScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="key-variant" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Create Account"
        component={SetUserDetails}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome name="user-plus" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 30,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  credentialsContainer: {
    marginBottom: 20,
    width: "80%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
});

export default LoginScreen;
