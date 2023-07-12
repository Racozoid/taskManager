import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux"

import TaskScreen from './screens/TaskScreen';
import AddTaskScreen from "./screens/AddTaskScreen";
import MainScreen from './screens/MainScreen';
import { setupStore } from './store/store';


type RootStackParamList = {
  Main: undefined,
  Task: undefined,
  Add: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Store = setupStore()

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Tasks' }} />
          <Stack.Screen name="Task" component={TaskScreen} />
          <Stack.Screen name="Add" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

