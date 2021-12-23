import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue, set, off } from "firebase/database";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  id: string;
  amount: number;
}

export const PersonBalance = ({ name, id, amount }: Props) => {
  const db = getDatabase();
  const reference = ref(db, "users/" + id);

  const updateUserAmount = (amount: number) => {
    set(reference, {
      name,
      amount,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.amountContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateUserAmount(amount - 1)}
        >
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.amount]}>{amount}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateUserAmount(amount + 1)}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
  },
  amount: {
    marginHorizontal: 20,
  },
});
