import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Questions } from "../../pages/Questions/Questions.page";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Upcoming } from "../../pages/Upcoming/Upcoming.page";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Questions: "cards-playing-outline",
  Events: "home",
};

export const AuthenticatedNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const iconName = TAB_ICON[route.name];
        return {
          tabBarIcon: ({ size, color }) => {
            if (iconName === "home") {
              return <FontAwesome name={iconName} color={color} size={size} />;
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
          tabBarActiveTintColor: "#5d8cf9",
          tabBarInactiveTintColor: "#abc5ff",
          headerShown: false,
          animationEnabled: false,
          tabBarStyle: {
            backgroundColor: "#fff",
          },
        };
      }}
    >
      <Tab.Screen name="Events" component={Upcoming} />
      <Tab.Screen name="Questions" component={Questions} />
    </Tab.Navigator>
  );
};
