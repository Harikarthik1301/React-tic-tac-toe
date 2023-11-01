import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Header from "./components/Header"
import  Player  from "./components/Player"
import Log from './components/Log';

function App() {
  
  const [gameTurns , setGameTurns ] = useState([]);
  const [activePlayer,setActivePlayer] = useState(' X ');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === ' X ' ? ' O ' : ' X ')
    console.log(activePlayer);
  }

  return (
   <main>
    <Header />
    <div id="game-container">
      <ol id="players" className='highlight-player'>
      <Player name="Player 1" symbol=" X " isActive={activePlayer === ' X '}/>
      <Player name="Player 2" symbol=" O " isActive={activePlayer === ' O '}/>
      </ol>
      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol={activePlayer}/>
    </div>
    <Log/>
   </main>
  )
}

export default App
