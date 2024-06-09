import 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RegisterScreens } from './src/screens/RegisterScreens';
import { LoginScreen } from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <LoginScreen/>
        {/* <RegisterScreens/> */}
      </PaperProvider>
    </NavigationContainer>
  )
}
export default App;