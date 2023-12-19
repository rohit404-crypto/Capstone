import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import Signup from "./screens/signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Home from "./screens/home";
import Splash from "./screens/splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

export default function App() {
  const isSignedInstateinLocal = AsyncStorage.getItem("login") === "success";
  // const userData = AsyncStorage.getItem("userData");

  const [isSignedIn, setisSignedIn] = useState(isSignedInstateinLocal);

console.log(isSignedIn)
// console.log(userData)

  return (
    <Context.Provider value={[isSignedIn, setisSignedIn]}>
      <NavigationContainer>
        {!isSignedIn ?(
          <>
          <Stack.Navigator initialRouteName="splash">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />

          <Stack.Screen name="splash" component={Splash} />
        </Stack.Navigator>
          </>
        ):(
          <>
          <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" component={Home} />
        
        </Stack.Navigator>
          </>
        )}
        
      </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({});
