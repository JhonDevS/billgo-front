import { Redirect } from "expo-router";
import { useSession } from "@/context";
import { Text } from "react-native";


export default function Index() {
  const { isLoading } = useSession();

  if (isLoading) {
    console.log('isLoading');
    return <Text>Loading...</Text>;
  }

  console.log('index');
  return <Redirect href="/(app)/(drawer)/(tabs)" />;
}