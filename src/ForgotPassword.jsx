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
import * as firebaseAuth from "firebase/auth";
import { auth } from "../Firebase";

export default function ForgotPassword({ navigation }) {
  const [getEmailId, setEmailId] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPasswordFunction = () => {
    setLoading(true);

    if (getEmailId === "") {
      setEmailError("*This is Required");
    }

    if (getEmailId !== "") {
      firebaseAuth
        .sendPasswordResetEmail(auth, getEmailId)
        .then((ok) => {
          setLoading(false);
          setEmailId("");
          setError(true);
          setThrowError("Mail Send Successfully");
          setTimeout(() => {
            navigation.replace("Splash");
          }, 500);
        })
        .catch((err) => {
          setLoading(false);
          setEmailId("");
          setError(true);
          setThrowError("Something went wrong/Email not registered yet!");
        });
    } else {
      setLoading(false);
      setError(true);
      setThrowError("Please Enter the Email carefully");
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
      <Text style={styles.header}>Forgot Password</Text>
      <Image
        style={styles.resetImage}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/forgot.jpg",
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
        placeholder={"Email"}
        focusColor={"#f1d15f"}
        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Email",
          style: {
            color: "#0e0e21",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{emailError}</Text>,
        }}
        values={getEmailId}
        onChangeText={(value) => {
          setEmailId(value);
          setError(false);
          setEmailError("");
        }}
      />
      {/* Login Button */}
      <TouchableOpacity
        style={styles.resetbtnBox}
        onPress={forgotPasswordFunction}
      >
        <Text style={styles.resetbtn}>Send Password Reset Mail</Text>
        {loading && loading ? (
          <ActivityIndicator style={styles.indicator} color={"white"} />
        ) : null}
      </TouchableOpacity>
      {/* Register Button */}
      <View style={styles.createAccount}>
        <Text
          style={styles.createAccountText}
        >{`Please provide registered Email for password reset`}</Text>
      </View>
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
  resetImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  resetbtnBox: {
    backgroundColor: "#f1d15f",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  resetbtn: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 10,
    width: 300,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountText: {
    color: "grey",
    fontSize: 12,
  },
  myLogo: {
    top: -30,
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
  },
});
