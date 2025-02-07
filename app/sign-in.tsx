import { useSession } from "@/context";
import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

const SingIn = () => {

  // TODO: create custom hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  // TODO: Separate this logic into a custom hook
  const handleLogin = () => {
    try {
      signIn(email, password);
    } catch (error) {
      console.log(error);
      return null
    }
  };

  console.log('dassda')

  const handleSingInpRess = async () => {
    const resp = await handleLogin();
    router.replace("/(app)/(drawer)/(tabs)/");
  }

  return (
    <Text>
      Este es el login
    </Text>
  )
}

export default SingIn;