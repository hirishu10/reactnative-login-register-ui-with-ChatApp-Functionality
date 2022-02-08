import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomBox from "react-native-customized-box";
// import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { dbAuth } from "../Firebase";
import { serverTimestamp } from "firebase/firestore";

export default function CreateNewChat({ navigation }) {
  const [getChatId, setChatId] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [getDisabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  //
  const createChatFunction = () => {
    setDisabled(true);
    setLoading(true);
    if (getChatId !== "") {
      try {
        const getCollection = firestore.collection(dbAuth, "chats");
        const getDocument = firestore.doc(getCollection, getChatId);
        firestore
          .setDoc(getDocument, {
            chatName: getChatId,
            photoURL:
              "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
            firstName: getChatId,
            lastName: getChatId,
            emailId: getChatId,
            lastMessage: "Please write your first message",
            dateTime: "4/2/2022",
            timestamp: serverTimestamp(),
          })
          .then((ok) => {
            setDisabled(false);
            setLoading(false);
            setChatId("");
            navigation.goBack();
          })
          .catch((err) => {
            alert("Something went wrong");
          });
      } catch (error) {}
      //connect the data base and create new chat
    } else {
      setDisabled(false);
      setLoading(false);
      setError(true);
      setThrowError("Please enter unique chat name");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        style={styles.myLogo}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
        }}
      />
      <Text style={styles.header}>Create Chat for Free!</Text>
      <Image
        style={styles.loginImage}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/login.png",
        }}
      />
      {getError ? (
        <View style={styles.errorCard}>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => {
              setError(false);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
          </TouchableOpacity>
          <Text style={styles.errorCardText}>{throwError}</Text>
        </View>
      ) : null}
      <CustomBox
        placeholder={"Enter Chat Name"}
        boxColor={"dodgerblue"}
        focusColor={"#e65c40"}
        keyboardType="email-address"
        boxStyle={{ borderRadius: 40, borderWidth: 2, marginBottom: 20 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Chat Name",
          style: {
            color: "#0e0e21",
            fontWeight: "bold",
          },
        }}
        values={getChatId}
        onChangeText={(value) => {
          setChatId(value);
          setError(false);
        }}
      />

      {/* create new chat */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={createChatFunction}
        disabled={getDisabled}
      >
        <Text style={styles.loginBtnText}>Create New Chat</Text>
        {loading && loading ? (
          <ActivityIndicator style={styles.indicator} color={"white"} />
        ) : null}
      </TouchableOpacity>
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
  errorCard: {
    width: 300,
    height: 50,
    backgroundColor: "#de3138",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 40,
  },
  errorCardText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    left: 250,
    position: "relative",
  },
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
    marginTop: -30,
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "dodgerblue",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 22,
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    top: -50,
    marginBottom: 10,
  },
});
