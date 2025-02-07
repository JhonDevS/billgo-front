import { useSession } from "@/context";
import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = () => {
  const { user } = useSession();

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  return (
    <View className="flex-1 mt-4 p-4">
      <Text>
        Welcome {displayName} to your profile
      </Text>
    </View>
  );
};

export default ProfileScreen;
