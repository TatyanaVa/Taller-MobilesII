import 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RegisterScreens } from './src/screens/RegisterScreens';
import { LoginScreen } from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { Game } from './src/screens/Game';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Game/>
        {/* <StackNavigator/> */}
        {/* <LoginScreen/> */}
        {/* <RegisterScreens/> */}
      </PaperProvider>
    </NavigationContainer>
  )
}
export default App;