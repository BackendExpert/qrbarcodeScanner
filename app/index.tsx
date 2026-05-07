import { Text, View, Linking } from "react-native";
import { ScanLine } from "lucide-react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6 overflow-hidden">
      <View className="absolute top-[-120] left-[-80] w-72 h-72 bg-pink-100 rounded-full blur-3xl" />
      <View className="absolute bottom-[-120] right-[-80] w-72 h-72 bg-violet-100 rounded-full blur-3xl" />
      <View className="absolute top-1/2 left-[-100] w-60 h-60 bg-cyan-100 rounded-full blur-3xl" />
      <View className="absolute top-20 right-[-60] w-52 h-52 bg-orange-100 rounded-full blur-3xl" />

      <View className="items-center w-full">
        <View className="w-32 h-32 rounded-[40px] bg-black items-center justify-center shadow-2xl shadow-zinc-300">
          <View className="absolute w-40 h-40 rounded-full bg-zinc-100 opacity-60" />
          <ScanLine size={54} color="#ffffff" strokeWidth={2.5} />
        </View>

        <Text className="text-5xl font-black text-zinc-900 mt-10 tracking-tight">
          ScanMe
        </Text>

        <View className="mt-4 px-5 py-2 rounded-full bg-zinc-100">
          <Text className="text-zinc-600 font-medium tracking-widest text-xs">
            POWERED BY BAL
          </Text>
        </View>

        <Text className="text-zinc-400 text-center mt-6 leading-6 text-base max-w-[260px]">
          Fast and secure QR scanning experience with a clean modern interface.
        </Text>
      </View>

      <View className="absolute bottom-10 w-full items-center">
        <Text className="text-gray-500 text-xs text-center px-4">
          © {new Date().getFullYear()} Energy Monitoring System • All Rights Reserved •{" "}
          powered by{" "}
          <Text
            className="text-blue-600 underline"
            onPress={async () => {
              const url = "https://www.blackalphalabs.com/";
              const supported = await Linking.canOpenURL(url);

              if (supported) {
                await Linking.openURL(url);
              }
            }}
          >
            blackalphalabs
          </Text>
        </Text>
      </View>
    </View>
  );
}