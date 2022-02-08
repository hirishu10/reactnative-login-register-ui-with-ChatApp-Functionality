import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GetPhoto({ navigation, route }) {
  const DARK_COLOR = "#212121"; //#242c40  #212121 #37474f
  const LIGHT_COLOR = "#dee4e7";
  //
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => {
        return (
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerEach}
              onPress={() => {
                Platform.OS === "android"
                  ? Alert.alert(
                      "Beta",
                      "Currently not do anything in future may be edit the chat details",
                      [
                        {
                          text: "OK",
                          onPress: () => {},
                        },
                      ]
                    )
                  : alert(
                      "Beta : Currently not do anything in future may be edit the chat details"
                    );
              }}
            >
              <MaterialCommunityIcons name="pencil" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerEach}
              onPress={() => {
                Platform.OS === "android"
                  ? Alert.alert(
                      "Beta",
                      "Currently not do anything in future may be share the chat details",
                      [
                        {
                          text: "OK",
                          onPress: () => {},
                        },
                      ]
                    )
                  : alert(
                      "Beta : Currently not do anything in future may be share the chat details"
                    );
              }}
            >
              <Entypo name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View
        style={[
          styles.mainBlock,
          {
            backgroundColor: route.params?.getDarkMode
              ? DARK_COLOR
              : LIGHT_COLOR,
          },
        ]}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: route.params.photoURL }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBlock: {
    width: "100%",
    height: "70%",
  },
  headerRight: {
    height: 50,
    width: 100,
    flexDirection: "row",
  },
  headerEach: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
