import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from '../theme'

const styles = StyleSheet.create({
    inputField: {
        borderBottomColor: colors.input,
        borderBottomWidth: 1,
        fontSize: 18
    }
})

const Input = props => {
    return(
        <TextInput 
            {...props}
            style={{ ...props.style, ...styles.inputField }} 
        />
    )
}

export default Input