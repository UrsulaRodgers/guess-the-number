import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { colors } from '../theme'
import Card from '../components/Card'
import ContentText from '../components/ContentText'
import PrimaryButton from '../components/PrimaryButton'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    gameOverCard: {
        width: 300,
        maxWidth:'95%',
        alignItems: 'center',
        padding:30,
        marginVertical: 10
    },
    gameOverCardText: {
        fontSize: 22,
        color: colors.primary
    },
    number: {
        color: colors.primary
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: colors.input,
        overflow: 'hidden',
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    button: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
        width: 100
    }
})

const GameOverScreen = props => {
    const { rounds, selectedNumber } = props
    return (
        <ScrollView>
        <View style={styles.screen}>
            <Card style={styles.gameOverCard}>
                <ContentText style={styles.gameOverCardText}>GAME OVER!</ContentText>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../assets/success.png')} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <ContentText>Number of Rounds: <Text style={styles.number}>{rounds}</Text></ContentText>
                <ContentText>Selected Number to Guess: <Text style={styles.number}>{selectedNumber}</Text></ContentText>
            </Card>
            <PrimaryButton style={styles.button} press={() => props.startScreenHandler()}>PLAY AGAIN</PrimaryButton>
        </View>
        </ScrollView>
    )
}

export default GameOverScreen