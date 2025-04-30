import { View, Text } from "react-native";
import { styles } from "./styles";

type Props = {
  name: string;
};

export function WinnerBox({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 Sorteado: {name}</Text>
    </View>
  );
}
