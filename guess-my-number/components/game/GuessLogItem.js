import { StyleSheet, Text, View } from "react-native";
import Colors from "../../Util/colors";

export default function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    backgroundColor: Colors.accent500,
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,

    elevation: 4
  },

  itemText: {
    fontFamily: 'opens-sans'
  }
})