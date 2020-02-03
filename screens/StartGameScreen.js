import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import ContentText from '../components/ContentText'
import NumberOutput from '../components/NumberOutput'
import PrimaryButton from '../components/PrimaryButton'
import { colors } from '../theme'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    container: {
        padding: 10,
        width: 300,
        maxWidth: '90%',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    text: {
        fontFamily: 'open-sans'
    },
    inputContainer: {
        width:'50%',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        height: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%'
    },
    buttonView: {
        width: 100,
        margin: 5,
        borderRadius: 3
    },
    resetButton: {
        backgroundColor: colors.accent,
        borderColor: colors.accent
    },
    confirmButton: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },
    startButton: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
        width: 100
    },
    confirmedOutputCard: {
        width: '50%',
        marginTop: 30,
        padding: 10,
        alignItems: 'center'
    }
})

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState('')

    const numberInputHandler = numberInput => {
        setEnteredValue(numberInput.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <=1 || chosenNumber > 999) {
            Alert.alert(
                'Invalid Number!', 
                'Number has to be a number between 1 and 1000', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return 
        }
        setConfirmed(true)
        setEnteredValue('')
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.confirmedOutputCard}>
                <ContentText>
                    You selected:
                </ContentText>
                <NumberOutput>{selectedNumber}</NumberOutput>
                <PrimaryButton style={styles.startButton} press={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </PrimaryButton>
            </Card>
    }



    return (
        <ScrollView>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.container}>
                    <ContentText>Select a Number</ContentText>
                    <Input 
                        style={styles.inputContainer} 
                        keyboardType="numeric" 
                        blurOnInput 
                        autocorrect={false} 
                        maxLength={4}
                        onChangeText={numberInputHandler}
                        value={enteredValue} 
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonView}>
                            <PrimaryButton style={styles.resetButton} press={resetInputHandler}>RESET</PrimaryButton>
                        </View>
                        <View style={styles.buttonView}>
                            <PrimaryButton style={styles.confirmButton} press={() => confirmInputHandler()}>CONFIRM</PrimaryButton>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default StartGameScreen