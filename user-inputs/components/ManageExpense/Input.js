import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

export default Input = ({ label, style, invalid, textInputConfig }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabe]}>{label}</Text>
      <TextInput style={[inputStyles, invalid && styles.invalidInput]} {...textInputConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },

  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },

  invalidLabe: {
    color: GlobalStyles.colors.error500
  },

  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});