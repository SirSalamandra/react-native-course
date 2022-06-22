import { StyleSheet, View } from "react-native";

import Colors from "../../Util/colors";

export default function Card({ children }) {
  return (
    <View style={styles.inputContainer}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,

    //Shadow on android
    elevation: 4,

    //Shadow on iphone
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
});