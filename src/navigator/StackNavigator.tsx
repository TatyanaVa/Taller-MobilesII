import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { useEffect, useState } from 'react';
import { auth } from '../configs/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import { HomeScreen } from '../screens/HomeScreen';
import { RegisterScreens } from '../screens/RegisterScreens';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Game } from '../screens/Game';
import { ScoreCardComponent } from '../screens/components/ScoreCardComponent';



const Stack = createStackNavigator();

//Interface -Rutas
interface Routes{
  name:string;
  screen:()=> JSX.Element;
  headerShow?:boolean;
}

//arreglo que contiene las rutas cuando el usuario on esta autenticado
const routes:Routes[]=[
  {name: 'Login',screen: LoginScreen},
  {name: 'Register',screen:RegisterScreens},
  {name: 'Home',screen:HomeScreen},
  {name: 'Game',screen:Game},
];

export const StackNavigator=()=> {

  //hook useState-verificar si esta auth o no
  const [isAuth, setIsAuth] = useState<boolean>(false);

  //hook useState:controlar la carga inicial
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //hook useEffect - verificar si el user esta auth
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth,(user)=>{
      //validar si esta auth
      if(user){
        //console.log(user);
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);
  
  return (
    <>
      {isLoading?(
        <View>
          <ActivityIndicator  size={35} />
        </View>
        ) :(
          <Stack.Navigator initialRouteName={isAuth? 'Home':'Login'}>
            {
                routes.map((item,index)=>(
                <Stack.Screen 
                key={index} 
                name={item.name} 
                options={{headerShown:item.headerShow ?? false}} 
                component={item.screen} />
                ))
            }
          </Stack.Navigator>
        )}
  </>
  );
}