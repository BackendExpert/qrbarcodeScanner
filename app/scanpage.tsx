import { useEffect, useState } from "react";
import {
    Dimensions,
    Pressable,
    StatusBar,
    Text,
    View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import {
    ArrowRight,
    QrCode,
    ScanLine,
    Sparkles,
    X,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function ScanPage() {
    const [permission, requestPermission] = useCameraPermissions();
    const [openCamera, setOpenCamera] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        requestPermission();
    }, []);

    if (!permission) {
        return (
            <View className="flex-1 bg-white items-center justify-center px-6">
                <View className="w-28 h-28 rounded-[40px] bg-zinc-100 items-center justify-center mb-8">
                    <ScanLine size={48} color="#18181B" strokeWidth={2.5} />
                </View>

                <Text className="text-3xl font-black text-zinc-900">
                    Preparing Scanner
                </Text>

                <Text className="text-zinc-500 text-base mt-3 text-center">
                    Waiting for camera permission...
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />

            {!openCamera ? (
                <View className="flex-1 px-6 pt-20 pb-10">
                    <View className="flex-1 justify-between">
                        <View>
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-zinc-400 text-base font-semibold">
                                        SMART SCANNER
                                    </Text>

                                    <Text className="text-[44px] leading-[52px] font-black text-zinc-900 mt-2">
                                        Scan{"\n"}Code
                                    </Text>
                                </View>

                                <View className="w-24 h-24 rounded-[34px] bg-zinc-900 items-center justify-center">
                                    <QrCode
                                        size={44}
                                        color="white"
                                        strokeWidth={2.5}
                                    />
                                </View>
                            </View>

                            <View className="bg-zinc-100 rounded-[34px] p-6 mt-10">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-16 h-16 rounded-3xl bg-white items-center justify-center">
                                        <Sparkles
                                            size={28}
                                            color="#18181B"
                                            strokeWidth={2.4}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-zinc-400 text-sm font-bold">
                                            LAST RESULT
                                        </Text>

                                        {data ? (
                                            <Pressable onPress={() => router.push(data as any)}>
                                                <Text
                                                    numberOfLines={2}
                                                    className="text-blue-600 text-lg font-black mt-1 underline"
                                                >
                                                    {data}
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <Text
                                                numberOfLines={2}
                                                className="text-zinc-900 text-lg font-black mt-1"
                                            >
                                                No scans available
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>

                            <View className="flex-row gap-4 mt-6">
                                <View className="flex-1 bg-lime-100 rounded-[28px] p-5">
                                    <Text className="text-zinc-500 text-sm font-bold">
                                        TYPE
                                    </Text>

                                    <Text className="text-zinc-900 text-xl font-black mt-2">
                                        QR & Barcode
                                    </Text>
                                </View>

                                <View className="flex-1 bg-zinc-900 rounded-[28px] p-5">
                                    <Text className="text-zinc-500 text-sm font-bold">
                                        SPEED
                                    </Text>

                                    <Text className="text-white text-xl font-black mt-2">
                                        Ultra Fast
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="gap-4">
                            <Pressable
                                onPress={() => router.push("/myqr")}
                                className="bg-zinc-100 border border-zinc-200 rounded-[36px] p-6 active:scale-95"
                            >
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-zinc-500 text-sm font-bold">
                                            CREATE QR
                                        </Text>

                                        <Text className="text-zinc-900 text-2xl font-black mt-1">
                                            My QR
                                        </Text>
                                    </View>

                                    <View className="w-16 h-16 rounded-3xl bg-zinc-900 items-center justify-center">
                                        <ArrowRight
                                            size={30}
                                            color="white"
                                            strokeWidth={2.5}
                                        />
                                    </View>
                                </View>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    setScanned(false);
                                    setOpenCamera(true);
                                }}
                                className="bg-zinc-900 rounded-[36px] p-6 active:scale-95"
                            >
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-zinc-400 text-sm font-bold">
                                            READY TO SCAN
                                        </Text>

                                        <Text className="text-white text-2xl font-black mt-1">
                                            Open Camera
                                        </Text>
                                    </View>

                                    <View className="w-16 h-16 rounded-3xl bg-white items-center justify-center">
                                        <ArrowRight
                                            size={30}
                                            color="#18181B"
                                            strokeWidth={2.5}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            ) : (
                <View className="flex-1 bg-black">
                    <CameraView
                        style={{ flex: 1 }}
                        facing="back"
                        barcodeScannerSettings={{
                            barcodeTypes: [
                                "qr",
                                "ean13",
                                "ean8",
                                "code128",
                            ],
                        }}
                        onBarcodeScanned={
                            scanned
                                ? undefined
                                : ({ data }) => {
                                    setScanned(true);
                                    setData(data);
                                    setOpenCamera(false);
                                }
                        }
                    />

                    <View className="absolute inset-0 bg-black/50" />

                    <View className="absolute top-20 left-6 right-6 flex-row items-center justify-between">
                        <View className="bg-white/10 px-5 py-4 rounded-3xl backdrop-blur-xl">
                            <Text className="text-white text-lg font-black">
                                Point at code
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => setOpenCamera(false)}
                            className="w-16 h-16 rounded-3xl bg-white items-center justify-center"
                        >
                            <X
                                size={30}
                                color="#18181B"
                                strokeWidth={2.5}
                            />
                        </Pressable>
                    </View>

                    <View className="absolute inset-0 items-center justify-center">
                        <View
                            style={{
                                width: width * 0.78,
                                height: width * 0.78,
                            }}
                            className="items-center justify-center"
                        >
                            <View className="absolute inset-0 border-[1.5px] border-white/20 rounded-[50px]" />

                            <View className="absolute -top-1 -left-1 w-24 h-24 border-t-[8px] border-l-[8px] border-white rounded-tl-[50px]" />

                            <View className="absolute -top-1 -right-1 w-24 h-24 border-t-[8px] border-r-[8px] border-white rounded-tr-[50px]" />

                            <View className="absolute -bottom-1 -left-1 w-24 h-24 border-b-[8px] border-l-[8px] border-white rounded-bl-[50px]" />

                            <View className="absolute -bottom-1 -right-1 w-24 h-24 border-b-[8px] border-r-[8px] border-white rounded-br-[50px]" />

                            <View className="w-[70%] h-2 bg-white rounded-full opacity-90" />
                        </View>
                    </View>

                    <View className="absolute bottom-12 left-6 right-6 bg-white rounded-[34px] p-6">
                        <Text className="text-zinc-900 text-center text-lg font-black">
                            Keep the code inside the frame
                        </Text>

                        <Text className="text-zinc-500 text-center text-base mt-2 leading-7">
                            Scanner will automatically detect QR and barcode
                            instantly
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
``