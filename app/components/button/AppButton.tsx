import { Pressable, Text } from "react-native";

interface AppButtonProps {
    title: string;
    onPress?: () => void;
}

export default function AppButton({
    title,
    onPress,
}: AppButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className="bg-black active:opacity-80 px-6 py-4 rounded-2xl w-full items-center shadow-lg"
        >
            <Text className="text-white text-base font-semibold tracking-wide">
                {title}
            </Text>
        </Pressable>
    );
}