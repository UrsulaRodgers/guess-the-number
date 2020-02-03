import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
    return(
        <TouchableOpacity onPress={props.press}>
            <View style={{...props.style, ...styles.button}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PrimaryButton