import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { colors } from '../theme'
import ContentText from './ContentText'

const styles = StyleSheet.create({
    selectedNumber: {
        marginVertical: 10,
        fontSize: 25,
        color: colors.primary
    }
})

const NumberOutput = props => {
    return (
        <ContentText style={styles.selectedNumber}>{props.children}</ContentText>
    )
}

export default NumberOutput