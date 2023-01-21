import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  label: string
  checked?: boolean;
  bold?: boolean;
}

export function Checkbox({ label, checked = false, bold = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-start'
      {...rest}
    >
      {checked ? (
        <Animated.View 
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"/>
      )}

      <Text className={`text-white ml-3 ${bold ? 'text-2xl font-semibold' : 'text-base'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}