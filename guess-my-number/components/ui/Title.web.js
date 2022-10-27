import { StyleSheet, Text, Platform } from "react-native"

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'opens-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0, //* Platform.select({ios: 0, android: 2})
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300
  }
});