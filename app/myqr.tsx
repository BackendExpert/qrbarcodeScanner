import { useRef, useState } from "react";
import {
    Alert,
    Pressable,
    Share,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { ArrowLeft, Link2, Share2 } from "lucide-react-native";
import { router } from "expo-router";

export default function MyQR() {
    const [url, setUrl] = useState(""); 
    const viewShotRef = useRef<any>(null);

    const shareQR = async () => {
        try {
            if (!url) {
                Alert.alert("Please enter a URL");
                return;
            }

            const uri = await viewShotRef.current.capture();

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: "Share QR Code",
                    mimeType: "image/png",
                });
            } else {
                await Share.share({
                    message: url,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={20}
        >
            <View className="flex-1 px-6 pt-20 pb-10">
                <View className="flex-row items-center justify-between mb-10">
                    <Pressable
                        onPress={() => router.back()}
                        className="w-14 h-14 rounded-3xl bg-zinc-100 items-center justify-center"
                    >
                        <ArrowLeft size={26} color="#18181B" />
                    </Pressable>

                    <Text className="text-2xl font-black text-zinc-900">
                        My QR
                    </Text>

                    <View className="w-14" />
                </View>

                <View className="bg-zinc-100 rounded-[28px] p-5 mb-8">
                    <Text className="text-zinc-500 text-sm font-bold mb-3">
                        ENTER URL
                    </Text>

                    <View className="flex-row items-center bg-white rounded-2xl px-4 h-16">
                        <Link2 size={20} color="#71717A" />
                        <TextInput
                            value={url}
                            onChangeText={setUrl}
                            autoCapitalize="none"
                            className="flex-1 ml-3 text-zinc-900 font-semibold"
                        />
                    </View>
                </View>

                <View className="flex-1 items-center justify-center">
                    <ViewShot
                        ref={viewShotRef}
                        options={{ format: "png", quality: 1 }}
                    >
                        <View className="bg-zinc-100 p-8 rounded-[32px] items-center">
                            <View className="bg-white p-6 rounded-[24px]">
                                <QRCode
                                    value={url || " "} 
                                    size={220}
                                    color="#18181B"
                                />
                            </View>

                            <Text className="text-zinc-900 text-xl font-black mt-6">
                                Your QR Code
                            </Text>

                            <Text
                                numberOfLines={1}
                                className="text-zinc-500 mt-2 max-w-[240px]"
                            >
                                {url}
                            </Text>
                        </View>
                    </ViewShot>
                </View>

                <Pressable
                    onPress={shareQR}
                    className="bg-zinc-900 rounded-[30px] p-6 active:scale-95"
                >
                    <View className="flex-row items-center justify-center gap-3">
                        <Share2 size={22} color="white" />
                        <Text className="text-white text-lg font-black">
                            Share QR
                        </Text>
                    </View>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}