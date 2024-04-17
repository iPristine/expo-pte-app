import {Stack} from "expo-router";

const AuthLayout = ( ) => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: true }} />
      <Stack.Screen name="sign-in" options={{ headerBackVisible: false }} />
    </Stack>
  )
}