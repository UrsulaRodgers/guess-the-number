import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const App = () => {
  const [selectedNumber, setSelectedNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)} 
        onError={(err) => console.log(err)}
      />
    )
    // need a function that returns a promise for startAsync prop
  }

  startGameHandler = chosenNumber => {
    setSelectedNumber(chosenNumber)
  }

  gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  startScreenHandler = () => {
    setGuessRounds(0)
    setSelectedNumber(null)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (selectedNumber && guessRounds <= 0) {
    content = <GameScreen selectedNumber={selectedNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen 
                selectedNumber={selectedNumber} 
                rounds={guessRounds}
                startScreenHandler={startScreenHandler}
              />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Guess the number" />
        {content}
      </View>
    </SafeAreaView>
  );
}

export default App

