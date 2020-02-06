import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
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
    headerSmallScreen: {
        width: '100%',
        height: 60,
        paddingTop: 20,
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

    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        const updateAvailableScreenSizes = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateAvailableScreenSizes)
        
        return () => {
            Dimensions.removeEventListener('change', updateAvailableScreenSizes)
        }
    })

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.headerSmallScreen}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
        )
    }
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

export default Header