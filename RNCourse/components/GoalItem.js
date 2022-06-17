import { StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable android_ripple={{ color: '#dddddd' }} onPress={props.onDeleteItem.bind(this, props.id)}>
        <Text style={styles.goalItemText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },

  goalItemText: {
    padding: 8,
    color: 'white'
  }
});

export default GoalItem;