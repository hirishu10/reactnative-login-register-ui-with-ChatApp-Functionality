// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/Splash.jsx";
import Login from "./src/Login.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/Register.jsx";
import ForgotPassword from "./src/ForgotPassword.jsx";
import Home from "./src/Home.jsx";
// import CustomList from "./src/CustomList.jsx";
import ChatUiScreen from "./src/ChatUiScreen.jsx";
import ProfileSettings from "./src/ProfileSettings.jsx";
import UserProfileSettings from "./src/UserProfileSettings.jsx";
import CreateNewChat from "./src/CreateNewChat.jsx";
import GetPhoto from "./src/GetPhoto.jsx";
import Credits from "./src/Credits.jsx";

export default function App() {
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    // headerStyle: { backgroundColor: "#2C6BED" },
    headerStyle: { backgroundColor: "#212121" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={globalScreenOptions}
        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={
              {
                // headerTitle: (e) => {
                //   // e.children.replace("sdf");
                // },
              }
            }
          />
          <Stack.Screen
            name="ProfileSettings"
            component={ProfileSettings}
            options={{
              animation: "slide_from_right",
              title: "Profile Settings 🕵",
            }}
          />
          <Stack.Screen
            name="UserProfileSettings"
            component={UserProfileSettings}
            options={{
              animation: "slide_from_right",
              title: "User Profile Settings 🕵",
            }}
          />

          <Stack.Screen
            name="ChatUiScreen"
            component={ChatUiScreen}
            options={{ animation: "fade_from_bottom" }}
          />

          <Stack.Screen
            name="NewChat"
            component={CreateNewChat}
            options={{
              animation: "slide_from_right",
              title: "Create New Chat 💬",
            }}
          />
          <Stack.Screen
            name="GetPhoto"
            component={GetPhoto}
            options={{ animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="Credits"
            component={Credits}
            options={{
              animation: "slide_from_left",
              title: "Thank You All 🙂",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
