import React, { useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticatedNavigator } from "./auth.navigator";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthenticatedNavigator />
    </NavigationContainer>
  );
};
