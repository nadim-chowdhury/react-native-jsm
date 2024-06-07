import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">App</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "red" }}>
        Go to Profile
      </Link>
    </View>
  );
};

export default App;
