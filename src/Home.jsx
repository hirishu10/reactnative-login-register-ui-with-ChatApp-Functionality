import {
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomList from "./CustomList";
// import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { auth, dbAuth } from "../Firebase";
import { orderBy } from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const window = Dimensions.get("window");
  // const screen = Dimensions.get("screen");
  // Below for personal use only:
  // console.log(window);
  // console.log(screen);
  //
  const [getDisabled, setDisabled] = useState(false);
  const [getPhotoURL, setPhotoURL] = useState();
  const [loading, setLoading] = useState(true);
  const [getAllChats, setAllChats] = useState([]);
  //
  const [deleteContact, setDeleteContact] = useState(false);
  const [getDarkMode, setDarkMode] = useState(false);
  const DARK_COLOR = "#212121"; //#242c40  #212121 #37474f
  const LIGHT_COLOR = "#dee4e7";

  useEffect(() => {
    try {
      setAllChats([]);
      // for getting the image we take auth database
      const getCollection = firestore.collection(dbAuth, "auth");
      const getDocument = firestore.doc(
        getCollection,
        auth?.currentUser?.email
      );
      firestore
        .getDoc(getDocument)
        .then((item) => {
          setPhotoURL(item.get("photoURL"));
        })
        .catch((err) => {
          alert("Something went wrong");
        });
      //
      // Get all chats
      let eachChat = [];
      const chatCollection = firestore.collection(dbAuth, "chats");
      const queryDocument = firestore.query(
        chatCollection,
        orderBy("timestamp", "desc")
      );
      firestore.onSnapshot(queryDocument, {
        next: (item) => {
          item.forEach((e) => {
            eachChat.push([
              e.get("chatName"),
              e.get("photoURL"),
              e.get("lastMessage"),
              e.get("dateTime"),
              e.get("firstName"),
              e.get("lastName"),
              e.get("emailId"),
            ]);
          });
          setLoading(false);
          setAllChats(eachChat);
          eachChat = [];
        },
        error: (err) => {
          alert("Something went wrong");
        },
      });
      //
    } catch (error) {
      alert("Something went wrong");
    }
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => {
        return (
          <View
            style={{
              marginLeft: -10,
              width: 300,
              height: 45,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={getDisabled}
              style={{
                width: "15%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
              onPress={() => {
                Alert.alert("Logout....", "Are you sure want to LogOut?", [
                  {
                    text: "Yes",
                    onPress: () => {
                      auth.signOut();
                      navigation.replace("Login");
                    },
                  },
                  {
                    text: "No",
                    onPress: () => {},
                  },
                ]);
              }}
            >
              <Image style={styles.myLogo} source={{ uri: getPhotoURL }} />
            </TouchableOpacity>
            {/* Below for the Title design */}
            <TouchableOpacity
              style={{
                width: "85%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Credits");
              }}
            >
              <Text
                style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
              >
                react-native-login-register-ui
              </Text>
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  deleteContact
                    ? setDeleteContact(false)
                    : setDeleteContact(true);
                }}
              >
                {deleteContact && deleteContact ? (
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="white"
                  />
                ) : (
                  <SimpleLineIcons name="pencil" size={20} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  getDarkMode ? setDarkMode(false) : setDarkMode(true);
                }}
              >
                {getDarkMode && getDarkMode ? (
                  <Ionicons name="md-moon-sharp" size={24} color="white" />
                ) : (
                  <Ionicons name="sunny-sharp" size={20} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  navigation.navigate("UserProfileSettings");
                }}
              >
                <Entypo name="dots-three-vertical" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </>
        );
      },
    });
  }, [getPhotoURL, loading, getDarkMode, deleteContact]);
  //
  /**
   * Delete functin for the contact
   */
  const onPressFunctionDelete = (title, index) => {
    let access = "";

    Platform.OS === "android"
      ? Alert.alert(
          "Delete Contact.....",
          "Are you sure wan't to delete this contact?",
          [
            {
              text: "Yes",
              onPress: () => {
                // alert(`Id: ${index}, Title:${title}`); //personal
                try {
                  const chatCollection = firestore.collection(dbAuth, "chats");
                  const chatDocs = firestore.doc(chatCollection, title);
                  const unAllData = firestore
                    .deleteDoc(chatDocs)
                    .then((ok) => {
                      setDeleteContact(false);
                    })
                    .catch((err) => {
                      alert("User not deleted :> " + err);
                    });

                  return unAllData;
                } catch (error) {
                  alert("Something went wrong");
                }
              },
            },
            {
              text: "No",
              onPress: () => {},
            },
          ],
          "plain-text",
          "Yes"
        )
      : (access = prompt("Are you sure wan't to delete this contact?", "Yes"));

    if (Platform.OS !== "android") {
      access !== "" && access !== null
        ? access.toLowerCase() === "yes"
          ? forOtherRatherThanAndroid(title, index)
          : null
        : null;
    }
  };
  //
  const forOtherRatherThanAndroid = (title, index) => {
    try {
      const chatCollection = firestore.collection(dbAuth, "chats");
      const chatDocs = firestore.doc(chatCollection, title);
      const unAllData = firestore
        .deleteDoc(chatDocs)
        .then((ok) => {})
        .catch((err) => {
          alert("User not deleted :> " + err);
        });

      return unAllData;
    } catch (error) {
      alert("Something went wrong");
    }
  };
  //
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getDarkMode ? DARK_COLOR : LIGHT_COLOR },
      ]}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
            }}
          />
        }
      >
        {getAllChats.length <= 0 ? (
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: getDarkMode ? DARK_COLOR : LIGHT_COLOR,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: getDarkMode ? "#00C853" : "#00838F",
                fontWeight: "bold",
              }}
            >
              Nothing! Please create new chat for Free :)
            </Text>
          </View>
        ) : (
          getAllChats.map((item, index) => {
            return (
              <CustomList
                navigation={navigation}
                key={index}
                index={index}
                title={item[0]}
                photoURL={item[1]}
                LastMessage={item[2]}
                dateTime={item[3]}
                getDarkMode={getDarkMode}
                deleteContact={deleteContact}
                onPressFunctionDelete={onPressFunctionDelete}
              />
            );
          })
        )}
      </ScrollView>
      {/* Below for creating new chat */}
      {deleteContact && deleteContact ? null : (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            backgroundColor: getDarkMode ? "#00C853" : "#00838F",
            width: 60,
            height: 60,
            borderRadius: 40,
            position: "absolute",
            top: window.height - 160,
            left: window.width - 75,
            justifyContent: "center",
            alignItems: "center",
            animation: "circle",
          }}
          onPress={() => {
            navigation.navigate("NewChat");
          }}
        >
          <MaterialCommunityIcons
            name="android-messages"
            size={20}
            color="white"
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myLogo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  optionContainer: {
    left: 20,
    marginRight: 10,
    width: 100,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionTouch: {
    marginRight: 5,
    marginLeft: 5,
    width: 28,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
