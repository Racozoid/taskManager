import { useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ITask } from '../models/ITask';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {addTaskSlice} from '../store/reducers/addTaskSlice';



export default function AddTaskScreen({ navigation }) {
    // const {isChangeable, isComplete, title, description} = useAppSelector(state => state.addTaskReducer)
    // const {setChangeable, setComplete, setTitle, setDescription} = addTaskSlice.actions 
    // const dispatch = useAppDispatch


    // Hooks
    const [isComplete, setComplete] = useState(false);
    const [isChangeable, setChangeable] = useState(true);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // Add task to storage 
    const storeData = async () => {
        if (title.length === 0) {
            Alert.alert('Warning!', 'Please, enter title!')
        } else {
            const id: string | number[] = uuid.v4()
            const event = new Date
            const date: string = event.toDateString()

            const task: ITask = {
                id: id.toString(),
                title: title,
                description: description,
                changable: isChangeable,
                date: date,
                completed: isComplete,
            }
            try {
                await AsyncStorage.setItem(task.id, JSON.stringify(task))
                navigation.navigate('Main')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.title}>
                <TextInput
                    placeholder='Input title'
                    style={styles.text}
                    onChangeText={(newText) => (setTitle(newText))} />
            </View>
            <View style={styles.description}>
                <TextInput
                    placeholder='Input description'
                    style={styles.text}
                    multiline={true}
                    onChangeText={(newText) => (setDescription(newText))} />
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isComplete}
                    onValueChange={(setComplete)}
                    color={isComplete ? '#8D99AE' : undefined} />
                <Text style={styles.text}>Completed</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChangeable}
                    onValueChange={(setChangeable)}
                    color={isChangeable ? '#8D99AE' : undefined} />
                <Text style={styles.text}>Changeable</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={storeData}>
                <Text style={styles.textButton}>Add task</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        width: '97%',
        height: 45,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
    },
    description: {
        width: '97%',
        height: 85,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 25,
        padding: 4,
        borderBottomColor: '#2B2D42',
        textAlignVertical: 'top',
        margin: 5,

    },
    textButton: {
        fontSize: 25,
        padding: 4,
    },
    button: {
        width: '97%',
        height: 45,
        backgroundColor: '#8D99AE',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
    },
    checkbox: {
        margin: 8,
        width: 20,
        height: 20,

    },
    section: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    }
})
