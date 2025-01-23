import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Navigator } from "./src/infra/nav/navigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
          <Navigator />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
