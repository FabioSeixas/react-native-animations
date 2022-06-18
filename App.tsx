import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FirstExample, SecondExample } from './src/Containers'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="FirstExample" >
        <Drawer.Screen name="FirstExample" component={FirstExample} options={{
          gestureHandlerProps: {
            enabled: false
          }
        }} />
        <Drawer.Screen name="SecondExample" component={SecondExample} options={{
          gestureHandlerProps: {
            enabled: false
          }
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;
