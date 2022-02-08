import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import * as firebaseAuth from "firebase/auth";
// import * as firestore from "firebase/firestore";
// import { auth, dbAuth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomList({
  navigation,
  index,
  title,
  photoURL,
  LastMessage,
  dateTime,
  getDarkMode,
  deleteContact,
  onPressFunctionDelete,
}) {
  const [getModal, setModal] = useState(false);
  const DARK_COLOR = "#212121"; //#242c40  #212121 #37474f
  const LIGHT_COLOR = "#dee4e7";
  return (
    <>
      {/* Modal starts here */}
      {/* This is for the Photo Icon when you click it will pop the same */}
      <Modal visible={getModal} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            opacity: 0.5,
            position: "relative",
          }}
        >
          <Text
            style={{ backgroundColor: "black", height: "100%", width: "100%" }}
            onPress={() => {
              setModal(false);
            }}
          ></Text>
        </View>
        {/* Chat Design below */}
        <View
          style={{
            width: 240,
            height: 280,
            backgroundColor: "silver",
            alignSelf: "center",
            position: "absolute",
            marginTop: 80,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("GetPhoto", {
                title: title,
                photoURL: photoURL,
                getDarkMode: getDarkMode,
              });
              setModal(false);
            }}
          >
            <Image
              style={{
                width: 240,
                height: 240,
                backgroundColor: getDarkMode ? DARK_COLOR : LIGHT_COLOR,
              }}
              source={{ uri: photoURL }}
              onPress={() => {
                setModal(false);
              }}
            />
          </TouchableWithoutFeedback>
          <View style={styles.modalOptions}>
            {/*  */}
            <TouchableOpacity
              style={styles.modalEach}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("ChatUiScreen", {
                  title: title,
                  photoURL: photoURL,
                  getDarkMode: getDarkMode,
                });
                setModal(false);
              }}
            >
              <MaterialCommunityIcons
                name="android-messages"
                size={20}
                color="white"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              style={styles.modalEach}
              activeOpacity={0.9}
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
              <FontAwesome name="phone" size={20} color="white" />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              style={styles.modalEach}
              activeOpacity={0.9}
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
                      "Beta :  Currently not do anything in future may be do something"
                    );
              }}
            >
              <Ionicons name="videocam" size={20} color="white" />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              style={styles.modalEach}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("ProfileSettings", {
                  title: title,
                });
                setModal(false);
              }}
            >
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalOptionsHeader}></View>

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 40,
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
          </View>
        </View>
        {/*  */}
      </Modal>
      {/* Modal end here */}
      {/* Rest Title and date design below for the chat list */}
      <Pressable
        style={styles.mainContainer}
        android_ripple={{ color: "silver" }}
        onPress={() => {
          navigation.navigate("ChatUiScreen", {
            title: title,
            photoURL: photoURL,
            getDarkMode: getDarkMode,
          });
        }}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.mainContainerImage}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModal(true);
            }}
          >
            <Image
              style={styles.myLogo}
              source={{
                uri: photoURL,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.mainContainerData}>
          <Text
            style={{
              color: getDarkMode ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <Text
            style={{ color: getDarkMode ? "#757575" : "#607D8B" }}
            numberOfLines={1}
          >
            {LastMessage}
          </Text>
        </View>
        <View style={styles.mainContainerDate}>
          <Text
            style={{
              fontSize: 10,
              marginBottom: 5,
              color: "grey",
              fontWeight: "bold",
            }}
          >
            {dateTime}
          </Text>
          {deleteContact && deleteContact ? (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                onPressFunctionDelete(title, index);
              }}
            >
              <MaterialCommunityIcons
                name="delete-forever-outline"
                size={24}
                color="#ff4538"
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                backgroundColor: "dodgerblue",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Below is in the BETA mode later we fix */}
              <Text style={{ color: "white", fontSize: 12 }}>1</Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 70,
    flexDirection: "row",
  },
  mainContainerImage: {
    width: "20%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainerData: {
    width: "65%",
    height: 70,
    justifyContent: "center",
  },
  mainContainerDate: {
    width: "15%",
    height: 70,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  myLogo: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  imageClick: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  modalContainer: {
    width: 500,
    height: 500,
    backgroundColor: "blue",
    alignSelf: "center",
    marginTop: 80,
  },
  modal: {
    width: 250,
    height: 250,
    backgroundColor: "red",
    alignSelf: "center",
    marginTop: 80,
  },
  modalOptions: {
    backgroundColor: "red",
    width: 240,
    height: 40,
    flexDirection: "row",
  },
  modalEach: {
    width: "25%",
    height: 40,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOptionsHeader: {
    backgroundColor: "black",
    width: 240,
    height: 40,
    position: "absolute",
    opacity: 0.1,
  },
});
