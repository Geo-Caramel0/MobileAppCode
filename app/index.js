import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import UpdateUserDetails from "./updateuserdetails";
import StoreNewPasswordScreen from "./newpassword";
import DisplayPasswordInfo from './DisplayPasswordInfo';
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import LoginScreen from "./LoginScreen";
import GeneratePasswordScreen from "./generatepassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      console.log("Refreshing home screen...");
    }
  }, [route.params?.refresh]);

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

  const refreshHomeScreen = async () => {
    console.log("Refreshing home screen...");
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshHomeScreen();
    }, [])
  );

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
            component={() => (
              <UpdateUserDetails
                onUsernameUpdate={(username) => {
                  handleUsernameUpdate(username);
                  navigation.navigate("Home", { refresh: true });
                }}
                onPasswordUpdate={(password) => {
                  handlePasswordUpdate(password);
                  navigation.navigate("Home", { refresh: true });
                }}
              />
            )}
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
        </Drawer.Navigator>
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

const HomeScreen = ({ navigation }) => {
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
      }}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome, {username}!</Text>
        <Text style={styles.info}>
          You are logged in to your account. You can manage your account details
          and passwords from the drawer menu.
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoText}>
            Explore the options in the sidebar to manage your account.
          </Text>
          <Text style={styles.additionalInfoText}>
            Click on "Generate Password" to create secure passwords.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    width: "60%",
    marginBottom: 20,
  },
  additionalInfo: {
    alignItems: "center",
  },
  additionalInfoText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
});

export default Index;

