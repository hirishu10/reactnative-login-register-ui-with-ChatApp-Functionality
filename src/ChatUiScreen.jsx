import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { auth, dbAuth } from "../Firebase";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CustomBox from "react-native-customized-box";
import { orderBy, serverTimestamp } from "firebase/firestore";

export default function ChatUiScreen({ navigation, route }) {
  const [getMessage, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [getAllChats, setAllChats] = useState([]);
  //
  const scrollRef = useRef();
  //
  const [darkUI, setDarkUI] = useState(route.params.getDarkMode);
  const DARK_COLOR = "#212121"; //#242c40  #212121 #37474f
  const LIGHT_COLOR = "#dee4e7";
  //
  useEffect(() => {
    let allData = [];
    try {
      const customSring = `chats/${route.params.title}/messages`;
      const eachChatCollection = firestore.collection(dbAuth, customSring);
      const queryDocument = firestore.query(
        eachChatCollection,
        orderBy("timestamp", "asc")
      );
      // All snapshot from the database
      firestore.onSnapshot(queryDocument, {
        next: (all) => {
          all.forEach((item, index) => {
            allData.push([
              item.get("currentUser"),
              item.get("userChat"),
              item.get("timestamp"),
              item.get("dateTime"),
            ]);
          });
          setAllChats(allData);
          setLoading(false);
          allData = [];
        },
        error: (err) => {
          alert("Something went wrong");
        },
      });
    } catch (error) {
      alert("Something went wrong");
    }

    //  Header style
    navigation.setOptions({
      title: "",
      headerLeft: () => {
        return (
          <View
            style={{
              width: 270,
              height: 45,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.headLeft}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Feather name="arrow-left" size={24} color="white" />
              <Image
                style={styles.myLogo}
                source={{ uri: route?.params.photoURL }}
              />
            </TouchableOpacity>
            {/* Below for the Title design */}
            <TouchableOpacity
              style={{
                width: 200,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                flexWrap: "wrap",
              }}
              onPress={() => {
                navigation.navigate("ProfileSettings", {
                  title: route.params.title,
                });
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
              >
                {route.params.title}
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
                  Platform.OS === "android"
                    ? Alert.alert(
                        "Beta",
                        "Currently not do anything in future may be do something",
                        [
                          {
                            text: "OK",
                            onPress: () => {},
                          },
                        ]
                      )
                    : alert(
                        "Beta : Currently not do anything in future may be do something"
                      );
                }}
              >
                <Ionicons name="videocam" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  Platform.OS === "android"
                    ? Alert.alert(
                        "Beta",
                        "Currently not do anything in future may be do something",
                        [
                          {
                            text: "OK",
                            onPress: () => {},
                          },
                        ]
                      )
                    : alert(
                        "Beta : Currently not do anything in future may be do something"
                      );
                }}
              >
                <FontAwesome name="phone" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  navigation.navigate("ProfileSettings", {
                    title: route.params.title,
                  });
                }}
              >
                <Entypo name="dots-three-vertical" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </>
        );
      },
    });
  }, [route, loading]);

  const sendChatsToDatabase = () => {
    setMessage("");
    // Above is the data customized
    const d = new Date();
    const day =
      d.getDay() === 0
        ? "Sun"
        : d.getDay() === 1
        ? "Mon"
        : d.getDay() === 2
        ? "Tue"
        : d.getDay() === 3
        ? "Wed"
        : d.getDay() === 4
        ? "Thu"
        : d.getDay() === 5
        ? "Fri"
        : d.getDay() === 6
        ? "Sat"
        : null;
    //
    const month =
      d.getMonth() === 0
        ? "Jan"
        : d.getMonth() === 1
        ? "Feb"
        : d.getMonth() === 2
        ? "Mar"
        : d.getMonth() === 3
        ? "Apr"
        : d.getMonth() === 4
        ? "May"
        : d.getMonth() === 5
        ? "Jun"
        : d.getMonth() === 6
        ? "Jul"
        : d.getMonth() === 7
        ? "Aug"
        : d.getMonth() === 8
        ? "Sep"
        : d.getMonth() === 9
        ? "Oct"
        : d.getMonth() === 10
        ? "Nov"
        : d.getMonth() === 11
        ? "Dec"
        : null;
    const date = d.getDate();
    const hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    const minute = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;
    const amPm = d.getHours() >= 12 ? "pm" : "am";
    const time = `${date} ${month} ${day} ${hour}:${minute}${amPm}`;

    // Above is the data customized
    //Below Keyboard feature is optional
    // Keyboard.dismiss();
    //
    if (getMessage.length > 0) {
      // above code helps to scrollt to bottom after sending any new message!
      try {
        const customSring = `chats/${route.params.title}/messages`;
        const eachChatCollection = firestore.collection(dbAuth, customSring);
        firestore
          .addDoc(eachChatCollection, {
            timestamp: serverTimestamp(),
            currentUser: auth.currentUser.email,
            userChat: getMessage,
            dateTime: time,
          })
          .then((ok) => {
            /**
             * For Date Time
             */
            const newDate = new Date();
            const day = newDate.getDate();
            const month =
              newDate.getMonth() === 0
                ? 1
                : newDate.getMonth() === 1
                ? 2
                : newDate.getMonth() === 2
                ? 3
                : newDate.getMonth() === 3
                ? 4
                : newDate.getMonth() === 4
                ? 5
                : newDate.getMonth() === 5
                ? 6
                : newDate.getMonth() === 6
                ? 7
                : newDate.getMonth() === 7
                ? 8
                : newDate.getMonth() === 8
                ? 9
                : newDate.getMonth() === 9
                ? 10
                : newDate.getMonth() === 10
                ? 11
                : newDate.getMonth() === 11
                ? 12
                : null;
            const year = newDate.getFullYear();
            const customDateTime = `${day}/${month}/${year}`;
            //
            setLoading(true);
            try {
              const chatCollection = firestore.collection(dbAuth, "chats");
              const chatDocument = firestore.doc(
                chatCollection,
                route.params.title
              );
              firestore
                .updateDoc(chatDocument, {
                  lastMessage: getMessage,
                  dateTime: customDateTime,
                  timestamp: serverTimestamp(),
                })
                .then((ok) => {
                  // alert("last message saved");
                })
                .catch((err) => {
                  alert("Something went wrong");
                });
            } catch (error) {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            alert("Something went wrong");
          });
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };
  // 0 - item.get("currentUser"),
  // 1 - item.get("userChat"),
  // 2 - item.get("timestamp"),
  // 3 - item.get("dateTime"),
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkUI ? DARK_COLOR : LIGHT_COLOR },
      ]}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={{ backgroundColor: darkUI ? DARK_COLOR : LIGHT_COLOR }}
        showsVerticalScrollIndicator={false} //Totally optional
        decelerationRate="normal"
        ref={scrollRef}
        // onLayout={(e) => {
        //   // console.log(e.nativeEvent.layout);
        // }}
      >
        {getAllChats &&
          getAllChats.map((item, index) => {
            scrollRef.current.scrollToEnd({ animated: false });
            //
            return item[0] === auth.currentUser.email ? (
              <View key={index}>
                {/* Chats Sender */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-end",
                    right: 5,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 25,
                    backgroundColor: "red",
                    justifyContent: "center",
                    minHeight: 40,
                    minWidth: 100,
                    maxWidth: 350,
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>{item[1]}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    fontSize: 10,
                    right: 20,
                    color: "grey",
                  }}
                >
                  {item[3]}
                </Text>
                {/* Chats Sender */}
              </View>
            ) : (
              <View key={index}>
                {/* Chats Receiver */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-start",
                    left: 5,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 25,
                    backgroundColor: "green",
                    justifyContent: "center",
                    minHeight: 40,
                    minWidth: 100,
                    maxWidth: 350,
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>{item[1]}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 10,
                    left: 20,
                    color: "grey",
                  }}
                >
                  {item[3]}
                </Text>
                {/* Chats Receiver */}
              </View>
            );
          })}
        {/*  */}
        {/* -------------------------------------------------------------------------------- */}
        {/*  */}
        {/* -------------------------------------------------------------------------------- */}
        {/*  */}
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: "8%",
          paddingTop: 3,
          minHeight: 50,
          paddingBottom: 3,
          marginBottom: 5,
          flexDirection: "row",
          backgroundColor: darkUI ? DARK_COLOR : LIGHT_COLOR,
        }}
      >
        <View
          style={{
            width: "86%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: darkUI ? DARK_COLOR : LIGHT_COLOR,
          }}
        >
          <CustomBox
            boxStyle={{
              backgroundColor: darkUI ? "#616161" : "#CFD8DC",
              borderColor: "black",
              marginTop: -26,
              width: 350,
              height: 50,
              borderRadius: 40,
            }}
            inputStyle={{ paddingLeft: 20, color: darkUI ? "white" : "black" }}
            placeholder={"Message"}
            values={getMessage}
            onChangeText={(value) => {
              setMessage(value);
            }}
          />
        </View>
        <View
          style={{
            width: "14%",
            height: 50,
            paddingRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: darkUI ? "#00C853" : "#00838F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
            onPress={sendChatsToDatabase}
          >
            <Ionicons
              name="send"
              size={20}
              color={darkUI ? "white" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "white",
  },
  headLeft: {
    left: -10,
    width: 68,
    height: 50,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  optionContainer: {
    left: 20,
    marginRight: 10,
    width: 150,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionTouch: {
    marginLeft: 20,
    width: 28,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
