import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme'
import Card from '../components/Card'
import ContentText from '../components/ContentText'
import NumberOutput from '../components/NumberOutput'
import PrimaryButton from '../components/PrimaryButton'

const styles = StyleSheet.create({
    screen: {
        padding:10,
        alignItems: 'center',
        flexGrow: 1
    },
    screenView: {
        alignItems: 'center',
        flexGrow: 1
    },
    opponentGuessContainer: {
        width: 250,
        maxWidth: '90%',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
        width: Dimensions.get('window').width / 7,
        // can use Dimensions conditionally
        marginHorizontal: 10
    },
    prevGuessesHeader: {
        fontSize: 18,
        marginTop: 20
    },
    guessOutputContainer: {
        width: 300,
        maxWidth:'90%',
        flex: 1,
        padding: 10
    },
    guessOutput: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    guessView: {
        width: 200,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white'
    },
    guessNumber: {
        color: colors.primary
    }

})

const randomNumberGenerator = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.ceil(max)
    const randomNum = Math.floor(Math.random() * (max - min)) + min
    if (randomNum === exclude) {
        return randomNumberGenerator(min, max, exclude);
    } else {
        return randomNum
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(randomNumberGenerator(1,1000, props.selectedNumber))
    const [rounds, setRounds ] = useState(0)
    const [pastGuess, setPastGuess] = useState([])
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const currentLow = useRef(1)
    const currentHigh = useRef(1000)

    const { selectedNumber, onGameOver } = props

    useEffect(() => {
        if (currentGuess === selectedNumber) {
            onGameOver(rounds)
        }
    }, [currentGuess, selectedNumber, onGameOver])

    useEffect(() => {
        const updateAvailableScreenSize = () => {
             setAvailableDeviceHeight(Dimensions.get('window').height)
        }
 
        Dimensions.addEventListener('change', updateAvailableScreenSize)
         
         return () => {
             Dimensions.removeEventListener('change', updateAvailableScreenSize)
         }
     })

    nextGuessHandler = direction => {
        if (
            (direction === 'lower' &&  currentGuess < props.selectedNumber) ||
            (direction === 'higher' && currentGuess > props.selectedNumber)
        ) {
            Alert.alert('Are you sure?', 'The computer doesn\'t like lies!', [
                { text: 'Sorry!', style: 'cancel' }
            ])
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess 
        } else {
            currentLow.current = currentGuess
        }

        setPastGuess([currentGuess, ...pastGuess])
        const nextNumber = randomNumberGenerator(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(rounds => rounds + 1)
    }

    const pastGuessItem = (guess, numOfGuess) => {
        return (
            <View style={styles.guessView} key={numOfGuess}>
                <Text style={styles.guessNumber}>#{numOfGuess}</Text>
                <Text>{guess}</Text>
            </View>
        )
    }

    if (availableDeviceHeight < 500) {
        return (
            <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.screenView}>
                <Card style={styles.opponentGuessContainer}>
                    <ContentText>Opponent's Guess</ContentText>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton style={styles.button} press={() => nextGuessHandler('lower')}>
                            <Ionicons name="md-remove-circle-outline" size={32} />
                        </PrimaryButton>
                        <NumberOutput>{currentGuess}</NumberOutput>
                        <PrimaryButton style={styles.button} press={() => nextGuessHandler('higher')}>
                            <Ionicons name="md-add-circle-outline" size={32} />
                        </PrimaryButton>
                    </View>
                </Card>
                <ContentText style={styles.prevGuessesHeader}>Previous Guesses:</ContentText>
                <View style={styles.guessOutputContainer}>
                    <ScrollView contentContainerStyle={styles.guessOutput}>
                        {pastGuess.map((guess, index) => pastGuessItem(guess, pastGuess.length - index))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.screenView}>
                <Card style={styles.opponentGuessContainer}>
                    <ContentText>Opponent's Guess</ContentText>
                    <NumberOutput>{currentGuess}</NumberOutput>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton style={styles.button} press={() => nextGuessHandler('lower')}>
                            <Ionicons name="md-remove-circle-outline" size={32} />
                        </PrimaryButton>
                        <PrimaryButton style={styles.button} press={() => nextGuessHandler('higher')}>
                            <Ionicons name="md-add-circle-outline" size={32} />
                        </PrimaryButton>
                    </View>
                </Card>
                <ContentText style={styles.prevGuessesHeader}>Previous Guesses:</ContentText>
                <View style={styles.guessOutputContainer}>
                    <ScrollView contentContainerStyle={styles.guessOutput}>
                        {pastGuess.map((guess, index) => pastGuessItem(guess, pastGuess.length - index))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default GameScreen