import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/Splash";
import Login from "./src/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/Register";
import ForgotPassword from "./src/ForgotPassword";
import Home from "./src/Home";
import CustomList from "./src/CustomList";
import ChatUiScreen from "./src/ChatUiScreen";
import ProfileSettings from "./src/ProfileSettings";
import UserProfileSettings from "./src/UserProfileSettings";
import CreateNewChat from "./src/CreateNewChat";
import GetPhoto from "./src/GetPhoto";
import Credits from "./src/Credits";

export default function App() {
  // function Splash() {
  //   return <Splash />;
  // }
  // function Login() {
  //   return <Login />;
  // }

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
          {/* <Stack.Screen
            name="CustomList"
            component={CustomList}
            options={{ headerShown: false }}
          /> */}

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
