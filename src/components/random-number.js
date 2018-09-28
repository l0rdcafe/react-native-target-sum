import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center"
  },
  disabled: {
    opacity: 0.3
  }
});

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };
  handlePress = () => {
    const { onPress, id, isDisabled } = this.props;
    if (isDisabled) {
      return;
    }
    onPress(id);
  };
  render() {
    const { number, isDisabled } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, isDisabled && styles.disabled]}>{number}</Text>
      </TouchableOpacity>
    );
  }
}

export default RandomNumber;
