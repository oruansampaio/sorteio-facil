import { Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
    name: string;
}

export function DrawnParticipant({ name }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {name}
            </Text>
        </View>
    )
}