import { StyleSheet, Text } from "react-native";

import Colors from "../../Util/colors";

export default function InstructionText({ children, style }) {
  return (
    <Text style={[styles.instructionText, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'opens-sans-bold',
    color: Colors.accent500,
    fontSize: 24
  },
});