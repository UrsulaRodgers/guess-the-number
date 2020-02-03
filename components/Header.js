import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../theme'

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

export default Header