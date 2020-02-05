import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
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
        padding: 30,
        marginVertical: Dimensions.get('window').width * 0.03
    },
    gameOverCardText: {
        fontSize: 22,
        color: colors.primary
    },
    number: {
        color: colors.primary
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: Dimensions.get('window').width * 0.3,
        borderWidth: 3,
        borderColor: colors.input,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').width * 0.03
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