import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function EmptyHabits() {
  const { navigate } = useNavigation()

  function handleNavigateToNew() {
    navigate('new')
  }
  
  return (
    <Text className="text-zinc-400 text-base">
      Você não está monitorando nenhum hábito{" "}

      <Text className="text-violet-400 text-base underline active:text-violet-500" onPress={handleNavigateToNew}>
        comece cadastrando um.
      </Text>
    </Text>
  )
}