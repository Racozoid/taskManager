import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default function StickyButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.stickyButton} onPress={onPress}>
            <Icon name='plus' color={'#2B2D42'} size={19}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    stickyButton: {
        position: 'absolute',
        zIndex: 999,
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8D99AE',
        borderColor: '#2B2D42',
        borderWidth: 1,
    },
})
