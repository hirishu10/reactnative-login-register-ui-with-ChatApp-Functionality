import {
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Credits() {
  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.2,
        }}
      >
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.myBackground}
          source={{
            uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/chat-react-native/5484597.jpg",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.myLogo}
          source={{
            uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
          }}
        />
        <View
          style={{
            width: "100%",
            height: 400,
          }}
        >
          <TouchableOpacity
            style={styles.distributeEach}
            onPress={() => {
              Linking.openURL(
                "https://github.com/hirishu10/reactnative-login-register-ui-with-ChatApp-Functionality.git"
              );
            }}
          >
            <Fontisto name="github" size={40} color="#20242e" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              Visit Github Page
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.distributeEach}
            onPress={() => {
              Linking.openURL("https://github.com/hirishu10");
            }}
          >
            <View
              style={{
                width: 40,
                height: "92%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 28,
              }}
            >
              <Octicons name="logo-github" size={40} color="#20242e" />
            </View>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              Visit Github Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.distributeEach}
            onPress={() => {
              Linking.openURL(
                "https://www.npmjs.com/package/react-native-customized-box"
              );
            }}
          >
            <Fontisto name="npm" size={40} color="red" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              Visit NPM Packages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.distributeEach}
            onPress={() => {
              Linking.openURL("https://www.linkedin.com/in/rishuchowdhary/");
            }}
          >
            <AntDesign name="linkedin-square" size={40} color="#3164bc" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              Connect with me 🙂
            </Text>
          </TouchableOpacity>
          <View style={styles.distributeEachLast}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                Linking.openURL("https://reactnative.dev/");
              }}
            >
              <Fontisto name="react" size={24} color="#82d7f6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                Linking.openURL("https://en.wikipedia.org/wiki/JavaScript");
              }}
            >
              <Ionicons name="md-logo-javascript" size={24} color="#ffb300" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                Linking.openURL("https://firebase.google.com/");
              }}
            >
              <MaterialCommunityIcons
                name="firebase"
                size={24}
                color="#ffb300"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.credits}>
            <Text style={{ color: "#212121" }}>Rishu Chowdhary</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  distributeEach: {
    width: "100%",
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 50,
  },
  distributeEachLast: {
    marginTop: 50,
    width: "100%",
    height: 45,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  credits: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 140,
    marginBottom: 20,
    marginTop: 30,
  },
  myBackground: {
    width: 450,
    height: 450,
  },
  header: {
    fontSize: 25,
  },
});
