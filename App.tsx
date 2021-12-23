import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PersonBalance } from "./PersonBalance";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, onValue, set, get } from "firebase/database";
import { useEffect, useState } from "react";
import { TotalPrize } from "./TotalPrize";

const firebaseConfig = {
  apiKey: "AIzaSyBrfwcsaO0uj9pRLxjztVkeZOmoNDPa5Hk",
  authDomain: "no-swear.firebaseapp.com",
  projectId: "no-swear",
  storageBucket: "no-swear.appspot.com",
  messagingSenderId: "754158750202",
  appId: "1:754158750202:web:83225ad9e2b1dbf9943c43",
};
initializeApp(firebaseConfig);

export default function App() {
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    const db = getDatabase();

    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const usersRaw = snapshot.val();
      const adaptedUsers = Object.keys(usersRaw).map((key) => ({
        ...usersRaw[key],
        id: key,
      }));
      setUsers(adaptedUsers);
    });
  }, []);

  const totalAmount = users
    .map(({ amount }) => amount)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={users}
      renderItem={({ item }) => (
        <PersonBalance name={item.name} id={item.id} amount={item.amount} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<TotalPrize amount={totalAmount} />}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
