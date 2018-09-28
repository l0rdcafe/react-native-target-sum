import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import shuffle from "lodash.shuffle";
import RandomNumber from "./random-number";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd"
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: "center"
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  STATUS_PLAYING: {
    backgroundColor: "#bbb"
  },
  STATUS_WON: {
    backgroundColor: "green"
  },
  STATUS_LOST: {
    backgroundColor: "red"
  }
});

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  };
  state = { selectedIds: [], remainingSeconds: this.props.initialSeconds };
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => ({ remainingSeconds: prevState.remainingSeconds - 1 }),
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        }
      );
    }, 1000);
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);

      if (this.gameStatus !== "PLAYING") {
        clearInterval(this.intervalId);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  gameStatus = "PLAYING";
  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(() => 1 + Math.floor(10 * Math.random()));
  shuffledRandomNumbers = shuffle(this.randomNumbers);
  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce((a, b) => a + b, 0);
  isNumberSelected = i => this.state.selectedIds.indexOf(i) !== -1;
  selectNumber = i => {
    this.setState(prevState => ({ selectedIds: [...prevState.selectedIds, i] }));
  };
  calcGameStatus = nextState => {
    const sumSelected = nextState.selectedIds.reduce((a, b) => a + this.shuffledRandomNumbers[b], 0);

    if (nextState.remainingSeconds === 0) {
      return "LOST";
    }
    if (sumSelected < this.target) {
      return "PLAYING";
    }
    if (sumSelected === this.target) {
      return "WON";
    }
    return "LOST";
  };
  render() {
    const { gameStatus } = this;
    const { onPlayAgain } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((num, i) => (
            <RandomNumber
              key={i}
              id={i}
              number={num}
              isDisabled={this.isNumberSelected(i) || gameStatus !== "PLAYING"}
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {gameStatus !== "PLAYING" && <Button title="Play Again" onPress={onPlayAgain} />}
      </View>
    );
  }
}

export default Game;
