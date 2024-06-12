import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  console.log("🚀 ~ App ~ isLoggedIn:", isLoggedIn);
  console.log("🚀 ~ App ~ isLoading:", isLoading);

  // if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  if (isLoading && !isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-32 h-20"
          />

          <Image
            source={images.cards}
            className="w-full h-[280px] max-w-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-4">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities With{" "}
              <Text className="text-secondary-200">RNMA</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[16px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-6 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with RNMA
          </Text>

          <CustomButton
            title="Continue with email"
            handlePress={() => router.push("sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
