import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = " X ";

  if (gameTurns.length > 0 && gameTurns[0].player === " X ") {
    currentPlayer = " O ";
  }
  return currentPlayer;
}

function App() {

  const [players,setPlayers] = useState({
    X : 'Player 1',
    O : 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [won,setWon] = useState(false);
  // const [activePlayer,setActivePlayer] = useState(' X ');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameboard = [...initialGameboard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    //GETTING THE SYMBOLS OF THE POSSIBLE WINNING COMBINATION SQUARES
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    //Checking symbols in possibile places are same
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
       winner = players[firstSquareSymbol];
    }
  }
  //to check game is draw
 const isdraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === ' X ' ? ' O ' : ' X ')
    setGameTurns((preTurns) => {
      const currentPlayer = deriveActivePlayer(preTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurns,
      ];

      return updatedTurns;
    });
  }

  //function or rematch button
  function handleRematch(){
    setGameTurns([]);
  }

  //Function to control player name changes
  function handlePlayerNameChange(symbol , newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  };
  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol=" X "
            isActive={activePlayer === " X "}
            onChangeName ={handlePlayerNameChange}
          />
          <Player
            name="Player 2"
            symbol=" O "
            isActive={activePlayer === " O "}
            onChangeName ={handlePlayerNameChange}
          />
        </ol>
        {(winner || isdraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
