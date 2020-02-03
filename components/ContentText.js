import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    font: {
        fontFamily: 'open-sans'
    }
})

const ContentText = props => {
    return (
        <Text style={{...props.style, ...styles.font}}>{props.children}</Text>
    )
}

export default ContentText