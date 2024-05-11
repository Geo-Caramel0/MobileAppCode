import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
  TextInput,
  Button,
  Image,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import SetUserDetails from "./setuserdetails";
import UpdateUserDetails from "./updateuserdetails";
import NewPassword from "./newpassword";
import GeneratePassword from "./generatepassword";

const Drawer = createDrawerNavigator();

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./images/klipartz.com.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const Index = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Check if the password is entered correctly
    if (password === "correct_password") {
      // Navigate to the "View all Passwords" screen
      // You need to implement the navigation logic here
      alert("Password entered correctly!");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    // Navigate to the "SetUserDetails" screen
    navigation.navigate("SetUserDetails");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        <Text style={[styles.appName, styles.whiteText]}>Pass Guard</Text>
        <Image
          source={require("./images/klipartz.com.png")}
          style={styles.logo}
        />
        <Text style={[styles.welcomeText, styles.whiteText]}>Welcome User</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
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
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <Button title="OK" onPress={handleLogin} />
        <View style={styles.footer}>
          <Text style={styles.whiteText}>Enter password or </Text>
          <Text
            style={[styles.link, styles.whiteText]}
            onPress={handleCreateAccount}
          >
            Create Account
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Adjust duration as needed
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={Index}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Update Account"
            component={UpdateUserDetails}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="account-edit"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Store Password"
            component={NewPassword}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons name="key" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Create Password"
            component={GeneratePassword}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="lock-plus"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Black background
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
  passwordContainer: {
    position: "relative",
    width: "80%", // Adjust width to your preference
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
    color: "white",
  },
  icon: {
    position: "absolute",
    right: 10, // Adjust position as needed
    top: "50%",
    transform: [{ translateY: -12 }], // Center vertically
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  whiteText: {
    color: "white",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default App;
