import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { useEffect, useState } from 'react';
import { auth } from '../configs/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import { HomeScreen } from '../screens/HomeScreen';
import { RegisterScreens } from '../screens/RegisterScreens';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';


const Stack = createStackNavigator();

//Interface -Rutas
interface Routes{
  name:string;
  screen:()=> JSX.Element;
}

//arreglo que contiene las rutas cuando el usuario on esta autenticado
const routesNoAuth:Routes[]=[
  {name: 'Login',screen: LoginScreen},
  {name: 'Register',screen:RegisterScreens}
];

//Arreglo que tiene rutas cuando si esta uth
const routesAuth:Routes[]=[
  {name: 'Home',screen:HomeScreen}
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
        <View style={styles.root}>
          <ActivityIndicator size={45} />
        </View>
        ) :(
          <Stack.Navigator>
            {
              !isAuth?
                routesNoAuth.map((item,index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen} />
                ))
                :
                routesAuth.map((item,index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen} />
                ))
            }
          </Stack.Navigator>
        )}
  </>
  );
}