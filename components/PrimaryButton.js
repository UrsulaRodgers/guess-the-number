import React from 'react'
import { Text, View, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 3
    },
    button: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 3,
        padding: 3
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: 'white',
        textAlign: 'center'
    }
})

const PrimaryButton = props => {
    let ButtonComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version > 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent onPress={props.press}>
            <View style={{...props.style, ...styles.button}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </ButtonComponent>
        </View>
    )
}

export default PrimaryButton