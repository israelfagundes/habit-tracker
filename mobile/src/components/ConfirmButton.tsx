import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

export function ConfirmButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
      {...props}
    >
      <Feather
          name="check"
          size={20}
          color={colors.white}
        />
      <Text className="font-semibold text-base text-white ml-2">
        Confirmar
      </Text>
    </TouchableOpacity>
  )
}