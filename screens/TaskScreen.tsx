import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome";


export default function Task({ route, navigation }) {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        changable: true,
        date: '',
        completed: true,
    })
    const taskId = route.params

    

    const changeCompleteMark = async () => {
        try {
            setTask({...task, completed: !task.completed})
            mergeTask()
        } catch (e) {
            console.log(e)
        }
    }

    const mergeTask = async () => {
        try {
            await AsyncStorage.mergeItem(taskId, JSON.stringify(task))
        } catch (e) {
            console.log(e)
        }
    }

    const getTask = async () => {
        try {
            const value = await AsyncStorage.getItem(taskId)
            setTask(JSON.parse(value))
        } catch (e) {
            console.log(e)
        }
    }

    const deleteTask = async () => {
        try {
            await AsyncStorage.removeItem(taskId)
            navigation.navigate('Main')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTask()
    }, [taskId])

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.section}>
                    <TouchableOpacity 
                    onPress={() => changeCompleteMark()}>
                        <Icon
                            name={task.completed ? 'check' : 'close'}
                            color={task.completed ? '#2B2D42' : '#AA2C41'}
                            size={60} />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        {
                            task.changable ?
                                (<TextInput
                                    value={task.title}
                                    placeholder='Input title'
                                    style={styles.text}
                                    onChangeText={(newText) => {
                                        setTask({...task, title: newText})
                                    }}
                                    />)
                                :
                                (<Text style={styles.text}>{task.title}</Text>)
                        }
                    </View>
                </View>
                <View style={styles.description}>
                    {
                        task.changable ?
                            (<TextInput
                                value={task.description}
                                placeholder='Input title'
                                style={styles.text} 
                                onChangeText={(newText) => {
                                    setTask({...task, description: newText})
                                }}
                                />)
                            :
                            (<Text style={styles.text}>{task.description}</Text>)
                    }
                </View>
                <View style={styles.description}>
                    <Text style={styles.text}>Created: {task.date}</Text>
                </View>
                {task.changable ?
                    <TouchableOpacity style={styles.button} onPress={() => mergeTask()}>
                        <Text style={styles.textButton}>Change</Text>
                    </TouchableOpacity> : null
                }
                <TouchableOpacity style={styles.button} onPress={deleteTask}>
                    <Text style={styles.textButton}>Delete</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        width: '86%',
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        borderRadius: 5,
    },
    description: {
        width: '97%',
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
    },
})