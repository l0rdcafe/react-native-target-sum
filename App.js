import React from "react";
import Game from "./src/components/game";

export default class App extends React.Component {
  state = { gameId: 1 };
  resetGame = () => {
    this.setState(prevState => ({ gameId: prevState.gameId + 1 }));
  };
  render() {
    return <Game key={this.state.gameId} onPlayAgain={this.resetGame} randomNumberCount={6} initialSeconds={10} />;
  }
}
