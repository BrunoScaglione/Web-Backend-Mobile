import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// we will use screens folder to put the components that render screens



export default function App() {
  //// we will have to manage the selected number(state) here because its used by 
  // all screens 

  const [userNumber, setUserNumber] = useState();

  // the goal is set this when the game is over
  const [guessRounds, setGuessRounds] = useState(0);


  function configureNewGameHandler () {
    setGuessRounds(0);
    setUserNumber(null);
  }




  // when the user clicks start game in the first scrren, this function must be called
  // passing tha value of the variable selectedNumber(state in StartGamescreen.js)
  // to our state here selectedNumber
  function startGameHandler (selectedNumber) {
    setUserNumber(selectedNumber)
    setGuessRounds(0);
  }

  // should  be triggered from inside the game screen
  function gameOverHandler (numOfRounds) {
    setGuessRounds(numOfRounds);
  }

  // our default content, the game starts this way
  // is "let" because we can change content in the next lines
  let content = <StartGameScreen onStartGame={startGameHandler}/>;
  
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
  }
  
  return (
    <View style= {styles.screen}>
      <Header title= "Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // takes all the space it can vertically, and horizontally also since in the cross axis "srtech is default"
  }
});


