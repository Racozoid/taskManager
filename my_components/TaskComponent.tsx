import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,

} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


type TaskProps = {
    title: string,
    description: string,
    completed: boolean,
    onPress(): void,
}

export default function TaskComponent({ title, description, completed, onPress }: TaskProps) {
    return (
        <TouchableOpacity style={styles.body} onPress={onPress}>
            <View style={styles.column}>
                <View style={styles.image}>
                    <Icon 
                    name={completed ? 'check' : 'close'} 
                    color={completed ? '#2B2D42' : '#AA2C41'} 
                    size={60} />
                </View>
                <View style={styles.text}>
                    <Text style={styles.textHeader} numberOfLines={1}>{title}</Text>
                    <Text style={styles.textDescription} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '97%',
        height: 100,
        backgroundColor: '#8D99AE',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 5,
        // borderColor: '#2B2D42',
        // borderWidth: 1,
        borderRadius: 5,
    },
    textHeader: {
        fontSize: 25,
        margin: 5,
        fontWeight: 'bold'
    },
    textDescription: {
        fontSize: 20,
        margin: 5,
    },
    text: {
        marginEnd: '15%',

    },
    column:{
        flexDirection: 'row',
        margin: 5,

    },
    image: {
width: 65,
    },
});
