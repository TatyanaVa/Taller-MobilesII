import firebase, { updateProfile } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { auth } from '../configs/firebaseConfig';
import { FlatList, View } from 'react-native';
import { styles } from '../theme/styles';
import { StatusBar } from 'expo-status-bar';


interface formUser{
  name:string;
  phone:string;
}

export const HomeScreen = () => {
  //hooknuseState:manipular el formulario del perfil de usuario
  const [formUser, setFormUser] = useState<formUser>({
    name:'',
    phone:'',
  });

  useEffect(()=>{
    //obtener la data del usuario authenticado
    setUserAuth(auth.currentUser);
    setFormUser({
      name:auth.currentUser?.displayName??"",
      phone:auth.currentUser?.displayPhone??""});
  
},[]);

  //hook usestate:mostrata u ocultar
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false)

  //hook useState:capturar la data del usuario logeado
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);


  //Funcion para cambiar los datos del formulario
  const handlerSetValues =(key:string,value:string)=>{
    setFormUser({...formUser, [key]:value})
  };
//funcion actualizar la data del usuario el modal
const handlerUpdateUser = async()=>{
  await updateProfile(userAuth!,{
    displayName:formUser.name,
    displayPhone:formUser.phone,
  });
  setShowModalProfile(false);
}

  return (
    <>
    <View style={styles.rootHome}>
    <StatusBar style='light'/>
      <View style={styles.header}>
      <Avatar.Text size={55} label='MI'/> 
      <View>
        <Text variant='bodySmall'>Bienvenido </Text>
        <Text variant='labelLarge'>{userAuth?.displayName} </Text>
        </View>
        <View style={styles.iconEnd}>
          <IconButton style={styles.iconEnd}
            icon=""
            size={30}
            mode='contained'
            onPress={()=>setShowModalProfile(true)
              
            }
            />
        </View>
      </View>
    </View>
    <Portal>
      <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
      <View style={styles.modalProfile}>
        <Text variant='headlineMedium'>Mi Perfil</Text>
        <View style={styles.iconEnd}>
        <IconButton icon='close-circle-outline' 
        size={20} 
        onPress={()=>setShowModalProfile(false)} ></IconButton>
        </View>
        </View>
        
        <Divider />
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name} 
            onChangeText={(value)=>handlerSetValues('name',value)}/>
            <TextInput
            mode='outlined'
            label='Telefono'
            value={formUser.phone}
            onChangeText={(value)=>handlerSetValues('phone',value)}/>
        <TextInput
            mode='outlined'
            label='correo' 
            value= {userAuth?.email!}
            disabled />
        <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
    </Modal>
  </Portal>
  <FAB
    icon="plus"
    style={styles.fabMessage}
    onPress={() => console.log('Pressed')}
  />
  </>
  
  )
}


