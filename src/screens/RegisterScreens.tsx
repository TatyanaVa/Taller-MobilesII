import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { auth } from '../configs/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormResgister{
    email:string;
    password:string;
}

//Interface- Snackbar message
interface MessageSnackBar{
    visible:boolean;
    message:string;
    color:string;
}
export const RegisterScreens = () => {
    //hook UseState:cambiar el estado del formulkario
    const[formRegister,setFormregister]=useState<FormResgister>({
        email:'',
        password:''
    })

    //Hokk useState -visualizar u ocultar un mensaje
    const [showMessage,setShowMessage]=useState<MessageSnackBar>({
        visible:false,
        message:'',
        color:'#fff'
        });
        //hook useState: para visualizar la contraseña
    const [hiddenPassword, setHiddenPassword] = useState <boolean>(true);

    //hook useNavigation -navegar en screens
    const navigation =useNavigation();

    //Funcion para cambiar los datos del formulario se aconseja ponerle ese nombre handerlSetValue
    const handerSetValues=(key:string,value:string)=>{
        //OperadorSread: saca una copia del objeto
        setFormregister({...formRegister,[key]:value})
    }

    //Funcion para enviar y crear el usuario
    const handlerFormRegister=async()=>{
        //Validar la existencia de los datos del formulario
        if(!formRegister.email||!formRegister.password){
            setShowMessage({
                visible:true, 
                message:'Completa todos los campos!',
                color:'#8f0e1a'
            });
            return
        }
       try {
            const response=await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );
            setShowMessage({
                visible:true,
                message:'Registro exitoso!',
                color:'#2e7324'
            })
            console.log(response);
       } catch (ex){
            console.log(ex);
            setShowMessage({
            visible:true,
            message:'No se logró registrar, intentelo más tarde!',
            color:'#8f0e1a'
    })
       }
        
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Registrate</Text>
            <TextInput
                mode='outlined'
                label="Correo"
                placeholder='Escribe tu correo'
                style={styles.inputs}
                onChangeText={(value)=>handerSetValues('email',value)}
                />
            <TextInput
                mode='outlined'
                label="Contraseña"
                placeholder='Escribe tu contraseña'
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={()=> setHiddenPassword(!hiddenPassword)}/>}
                style={styles.inputs}
                onChangeText={(value)=>handerSetValues('password',value)}
        />
        <Button style={styles.button} mode="contained" onPress={handlerFormRegister} >Registrar</Button> 
        <Text 
            style={styles.textRedirect}
            onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
            Ya tienes una cuenta? Inicia Sesión
        </Text>
        <Snackbar
            visible={showMessage.visible}
            onDismiss={()=>setShowMessage({...showMessage,visible:false})}
            style={{backgroundColor:showMessage.color}}>
            {showMessage.message}
        </Snackbar>
    </View>
      )
    }
