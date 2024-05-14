import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Clipboard,
  Switch,
  ScrollView,
} from "react-native";

const GeneratePasswordScreen = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < parseInt(passwordLength); i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPassword(newPassword);
  };

  const copyToClipboard = () => {
    Clipboard.setString(generatedPassword);
    setSuccessMessage("Password copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
        }}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, styles.whiteText]}>
              Password Length:
            </Text>
            <TextInput
              style={[styles.input, styles.whiteText]}
              placeholder="Password Length"
              keyboardType="numeric"
              value={passwordLength.toString()}
              onChangeText={(text) => setPasswordLength(text)}
            />
            <TouchableOpacity style={styles.button} onPress={generatePassword}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkboxLabel, styles.whiteText]}>
              Symbols
            </Text>
            <Switch
              value={useSymbols}
              onValueChange={() => setUseSymbols(!useSymbols)}
              thumbColor="#fff"
              trackColor={{ false: "transparent", true: "#fff" }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkboxLabel, styles.whiteText]}>
              Numbers
            </Text>
            <Switch
              value={useNumbers}
              onValueChange={() => setUseNumbers(!useNumbers)}
              thumbColor="#fff"
              trackColor={{ false: "transparent", true: "#fff" }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkboxLabel, styles.whiteText]}>
              LowerCase
            </Text>
            <Switch
              value={useLowerCase}
              onValueChange={() => setUseLowerCase(!useLowerCase)}
              thumbColor="#fff"
              trackColor={{ false: "transparent", true: "#fff" }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkboxLabel, styles.whiteText]}>
              UpperCase
            </Text>
            <Switch
              value={useUpperCase}
              onValueChange={() => setUseUpperCase(!useUpperCase)}
              thumbColor="#fff"
              trackColor={{ false: "transparent", true: "#fff" }}
            />
          </View>
          {generatedPassword ? (
            <View style={styles.generatedPasswordContainer}>
              <Text style={[styles.label, styles.whiteText]}>
                Generated Password:
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.whiteText,
                    styles.generatedPassword,
                  ]}
                  value={generatedPassword}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={copyToClipboard}
                >
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {successMessage !== "" && (
            <Text style={[styles.successMessage, styles.whiteText]}>
              {successMessage}
            </Text>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  copyButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  generatedPasswordContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  generatedPassword: {
    flex: 1,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
  whiteText: {
    color: "white",
  },
});

export default GeneratePasswordScreen;
