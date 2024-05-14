import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import UpdateUserDetails from "./updateuserdetails";
import StoreNewPasswordScreen from "./newpassword";
import DisplayPasswordInfo from './DisplayPasswordInfo';
import { StyleSheet, Text, View, AsyncStorage, Button } from "react-native";
import LoginScreen from "./LoginScreen";
import GeneratePasswordScreen from "./generatepassword";


const Drawer = createDrawerNavigator();


const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      setIsLoggedIn(!!storedUsername);
      setUsername(storedUsername || "");
    } catch (error) {
      console.error("Error checking login status: ", error);
    }
  };

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <>
      {isLoggedIn ? (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="UpdateUserDetails"
            component={UpdateUserDetails}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="edit" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="GeneratePassword"
            component={GeneratePasswordScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="lock" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="StoreNewPassword"
            component={StoreNewPasswordScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="lock" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="DisplayPasswordInfo"
            component={DisplayPasswordInfo}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="lock" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={LogoutScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="sign-out" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};


const HomeScreen = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername !== null) {
        setUsername(storedUsername);
      } else {
        console.log("Username not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error retrieving username: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
    </View>
  );
};


const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      navigation.navigate("Login");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Index;

