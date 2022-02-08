import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomBox from "react-native-customized-box";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { auth, dbAuth } from "../Firebase";

export default function Register({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmailId, setEmailId] = useState("");
  const [getPassword, setPassword] = useState("");

  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const registerFunction = () => {
    setLoading(true);
    if (getFirstName === "") {
      setFirstError("*This is Required");
    }
    if (getLastName === "") {
      setLastError("*This is Required");
    }
    if (getEmailId === "") {
      setEmailError("*This is Required");
    }
    if (getPassword === "") {
      setPasswordError("*This is Required");
    }

    if (
      getEmailId !== "" &&
      getFirstName !== "" &&
      getLastName !== "" &&
      getPassword !== "" &&
      getPassword.length >= 6
    ) {
      succesfullyCreateAccount();
    } else {
      setError(true);
      setLoading(false);
      setThrowError("Please fill the Form carefully");
    }
  };

  const succesfullyCreateAccount = () => {
    setLoading(true);
    firebaseAuth
      .createUserWithEmailAndPassword(auth, getEmailId, getPassword)
      .then((userValue) => {
        firebaseAuth.updateProfile(userValue.user, {
          displayName: getFirstName,
          photoURL:
            "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
        });
        try {
          const mainCollection = firestore.collection(dbAuth, "user");
          const document = firestore.doc(mainCollection, getEmailId);
          firestore
            .setDoc(document, {
              userId: getEmailId,
              firstName: getFirstName,
              lastName: getLastName,
              emailId: getEmailId,
            })
            .then((u) => {
              // alert("Document added in your databases");
              //
              // This is for the auth database
              const authCollection = firestore.collection(dbAuth, "auth");
              const authDocument = firestore.doc(authCollection, getEmailId);
              firestore
                .setDoc(authDocument, {
                  userId: getEmailId,
                  firstName: getFirstName,
                  lastName: getLastName,
                  emailId: getEmailId,
                  photoURL:
                    "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
                })
                .then((ok) => {
                  // alert("Auth Added in database");
                })
                .catch((err) => {
                  alert("Something went wrong");
                });
            })
            .catch((err) => {
              alert("Something went wrong");
            });
          setEmailId("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setLoading(false);
          navigation.replace("Splash");
        } catch (error) {
          alert(error);
        }
      })
      .catch((err) => {
        setError(true);
        setThrowError(
          "Sorry! Something went wrong / enter password more than 6 char"
        );
        setLoading(false);
        alert("Something went wrong");
        // auth already happen need to be check!
      });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.container}>
          <Image
            style={styles.myLogo}
            source={{
              uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
            }}
          />
          <Text style={styles.header}>Create Account for Free!</Text>
          <Image
            style={styles.registerImage}
            source={{
              uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/register.png",
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
          {/* UserId */}
          <CustomBox
            placeholder={"UserId"}
            boxColor={"silver"}
            focusColor={"#e07964"}
            boxStyle={{ borderRadius: 40, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "grey",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "UserId",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: "*You don't need to provide user Id",
            }}
            values={getEmailId}
          />
          {/* First Name */}
          <CustomBox
            placeholder={"First Name"}
            boxColor={"silver"}
            focusColor={"#e07964"}
            boxStyle={{ borderRadius: 40, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "First Name",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{firstError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getFirstName}
            onChangeText={(value) => {
              setFirstName(value);
              setError(false);
              setFirstError("");
            }}
          />
          {/* Last Name */}
          <CustomBox
            placeholder={"Last Name"}
            boxColor={"silver"}
            focusColor={"#e07964"}
            boxStyle={{ borderRadius: 40, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
            }}
            labelConfig={{
              text: "Last Name",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{lastError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getLastName}
            onChangeText={(value) => {
              setLastName(value);
              setError(false);
              setLastError("");
            }}
          />
          {/* Email Id */}
          <CustomBox
            placeholder={"Email"}
            boxColor={"silver"}
            focusColor={"#e07964"}
            type={"email"}
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
              style: {
                marginBottom: 10,
              },
            }}
            values={getEmailId}
            onChangeText={(value) => {
              setEmailId(value);
              setError(false);
              setEmailError("");
            }}
          />
          {/* Password */}
          <CustomBox
            placeholder={"Password"}
            boxColor={"silver"}
            focusColor={"#e07964"}
            boxStyle={{ borderRadius: 40, borderWidth: 2 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
              overflow: "hidden",
            }}
            labelConfig={{
              text: "Password",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            toggle={true}
            requiredConfig={{
              text: <Text>{passwordError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getPassword}
            onChangeText={(value) => {
              setPassword(value);
              setError(false);
              setPasswordError("");
            }}
          />
          {/* Login Button */}
          <TouchableOpacity
            style={styles.registerbtn}
            onPress={registerFunction}
          >
            <Text style={styles.registerBtnText}>Register</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
  registerImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
  },
  registerbtn: {
    marginTop: 10,
    backgroundColor: "#e65c40",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
  },
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
});
