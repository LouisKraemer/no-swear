import { Text, StyleSheet, View } from "react-native";

interface Props {
  amount: number;
}

const eurosPerSwear = 5;

export const TotalPrize = ({ amount }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cagnotte : {amount * eurosPerSwear} €</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
