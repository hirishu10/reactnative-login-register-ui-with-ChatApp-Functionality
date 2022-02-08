import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomBox from "react-native-customized-box";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { auth, dbAuth } from "../Firebase";

export default function UserProfileSettings({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmailId, setEmailId] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getPhotoURL, setPhotoURL] = useState("");
  const [getprevPhotoURL, setprevPhotoURL] = useState(
    "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png"
  );

  // Some state is not initialize yet it is in the BETA mode
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [PhotoURLError, setPhotoURLError] = useState("");
  const [loading, setLoading] = useState(false);
  const [getDisabled, setDisabled] = useState(false);

  useLayoutEffect(() => {
    try {
      const geAuthCollection = firestore.collection(dbAuth, "auth");
      const getAuthDocument = firestore.doc(
        geAuthCollection,
        auth.currentUser.email
      );
      firestore
        .getDoc(getAuthDocument)
        .then((item) => {
          setEmailId(item.get("emailId"));
          setFirstName(item.get("firstName"));
          setLastName(item.get("lastName"));
          setprevPhotoURL(item.get("photoURL"));
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    } catch (error) {
      alert("Something went wrong");
    }
  }, [getprevPhotoURL]);

  //
  const updateProfilePhoto = () => {
    setLoading(true);
    if (getPhotoURL !== "" && getPhotoURL.length >= 15) {
      //here the database connection required which take new URL and update the same
      try {
        const geAuthCollection = firestore.collection(dbAuth, "auth");
        const getAuthDocument = firestore.doc(
          geAuthCollection,
          auth.currentUser.email
        );
        firestore
          .updateDoc(getAuthDocument, {
            photoURL: getPhotoURL,
          })
          .then((ok) => {
            // alert("profile photo updated!");
            setLoading(false);
            setprevPhotoURL("");
            setPhotoURL("");
          })
          .catch((err) => {
            setLoading(false);
            alert("Something went wrong");
          });
      } catch (error) {
        setLoading(false);
        alert("Something went wrong");
      }
    } else {
      setError(true);
      setLoading(false);
      setThrowError("Please enter the valid Link!");
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{}}>
        <View style={styles.container}>
          {/* BETA LOGO */}
          <View
            style={{
              left: -140,
              width: 80,
              height: 40,
              backgroundColor: "dodgerblue",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>BETA</Text>
          </View>
          {/* BETA LOGO */}
          <Image
            style={styles.myLogo}
            source={{
              uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
            }}
          />
          <Text style={styles.header}>User Profile Settings</Text>
          <TouchableOpacity style={styles.registerImage}>
            <Image
              style={{
                width: 200,
                height: 200,
                // borderWidth: 1,
                // borderColor: "silver",
                borderRadius: 100,
              }}
              source={{
                uri: getprevPhotoURL,
              }}
            />
          </TouchableOpacity>
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
          {/* Profile Link */}
          <CustomBox
            placeholder={"URL Link"}
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
              text: "URL Link",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{""}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getPhotoURL}
            onChangeText={(value) => {
              setPhotoURL(value);
              setError(false);
              setPhotoURLError("");
            }}
          />
          <TouchableOpacity
            disabled={getDisabled}
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#FF5252",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
              flexDirection: "row",
            }}
            onPress={updateProfilePhoto}
          >
            <Text style={{ color: "white" }}>Change Profile Photo</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
          {/*  */}
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
              text: <Text>{""}</Text>,
              style: {
                marginBottom: 10,
              },
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
              //   color: "#30302e",
              color: "grey",
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
              text: <Text>{""}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getFirstName}
            // onChangeText={(value) => {
            //   setFirstName(value);
            //   setError(false);
            //   setFirstError("");
            // }}
          />
          {/* Last Name */}
          <CustomBox
            placeholder={"Last Name"}
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
              text: "Last Name",
              style: {
                color: "#0e0e21",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{""}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getLastName}
            // onChangeText={(value) => {
            //   setLastName(value);
            //   setError(false);
            //   setLastError("");
            // }}
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
              color: "grey",
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
              text: <Text>{""}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getEmailId}
            // onChangeText={(value) => {
            //   setEmailId(value);
            //   setError(false);
            //   setEmailError("");
            // }}
          />
          {/*  */}
          <TouchableOpacity
            disabled={getDisabled}
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#388E3C",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
              flexDirection: "row",
            }}
            onPress={() => {
              auth.signOut();
              navigation.replace("Login");
            }}
          >
            <Text style={{ color: "white" }}>Update Profile Data</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
          {/*  */}
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
    marginBottom: 20,
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
    marginBottom: 30,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 100,
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
  //   registerbtn: {
  //     marginTop: 10,
  //     backgroundColor: "#e65c40",
  //     width: 300,
  //     height: 50,
  //     borderRadius: 40,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     marginBottom: 50,
  //     flexDirection: "row",
  //   },
  //   registerBtnText: {
  //     color: "white",
  //     fontSize: 22,
  //   },
});
