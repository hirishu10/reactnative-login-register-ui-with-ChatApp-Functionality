import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import * as firebaseAuth from "firebase/auth";
import { auth } from "../Firebase";

export default function Splash({ navigation }) {
  useEffect(() => {
    try {
      const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          setTimeout(() => {
            navigation.replace("Home");
          }, 1000);
        } else {
          setTimeout(() => {
            navigation.replace("Login");
          }, 1000);
        }
      });
      return unsubscribe;
    } catch (error) {
      alert("Something went wrong");
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.highlighter}>react-native-login-register-ui</Text>
      <ActivityIndicator style={styles.indicator} color={"#757575"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  highlighter: {
    marginTop: 30,
    color: "#757575",
  },
  indicator: {
    marginTop: 50,
  },
});
