import { useState,  useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';

import StickyButton from '../my_components/StickyButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TaskComponent from '../my_components/TaskComponent';
import { ITask } from '../models/ITask';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {tasksSlice} from '../store/reducers/tasksSlice';


export default function MainScreen({ navigation }) {
    const {tasks} = useAppSelector(state => state.tasksReducer);
    const {updateTasks} = tasksSlice.actions;
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        });
        return unsubscribe
    }, [navigation])

    const getData = async () => {
        let keys: readonly string[] = []
        let allTasks: ITask[] = []
        try {
            keys = await AsyncStorage.getAllKeys()
            for (const i in keys) {
                await AsyncStorage.getItem(keys[i]).then(value => {
                    if (value != null) {
                        allTasks.push(JSON.parse(value))
                    }
                })
            }
            dispatch(updateTasks(allTasks))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled>
                {
                    tasks.map((item: ITask) =>
                      <TaskComponent 
                      key={item.id} 
                      title={item.title} 
                      description={item.description}
                      completed={item.completed} 
                      onPress={() => navigation.navigate('Task', item.id)} />
                    )
                }
            </ScrollView>
            <StickyButton onPress={() => navigation.navigate('Add')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F4',
    },
});