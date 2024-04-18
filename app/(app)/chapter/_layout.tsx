import { Stack } from "expo-router"


export default function ChapterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  )
}
