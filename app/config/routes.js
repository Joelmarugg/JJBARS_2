import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import CreateWorkouts from "../screens/CreateWorkouts";
import SavedWorkouts from "../screens/SavedWorkouts";
import OnlineWorkouts from "../screens/OnlineWorkouts";
import Workouts from "../screens/Workouts";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: { paddingTop: 0 }
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateWorkouts"
        component={CreateWorkouts}
        options={({ route }) => ({
          title: route.params?.title
        })}
      />
      <Stack.Screen
        name="SavedWorkouts"
        component={SavedWorkouts}
        options={({ route }) => ({
          title: route.params?.title
        })}
      />
      <Stack.Screen
        name="OnlineWorkouts"
        component={OnlineWorkouts}
        options={({ route }) => ({
          title: route.params?.title
        })}
      />
      <Stack.Screen
        name="Workouts"
        component={Workouts}
        options={({ route }) => ({
          title: route.params?.title
        })}
      />
    </Stack.Navigator>
  );
}
