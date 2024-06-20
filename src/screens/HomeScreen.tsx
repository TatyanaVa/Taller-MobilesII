import firebase, { updateProfile,signOut } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { auth, dbRealTime, } from '../configs/firebaseConfig';
import { FlatList, View } from 'react-native';
import { styles } from '../theme/styles';
import { StatusBar } from 'expo-status-bar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';



interface FormUser {
  name: string;
}
export interface Score{
  score:number,
  name:string
}

export const HomeScreen = () => {

  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
  });

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [scores, setScores]=useState<Score[]>([]);
  const navigation = useNavigation();

  //data 
  const getAllScores=()=>{
    const dbRef=ref(dbRealTime, "scores");
    onValue(dbRef,(snapshot)=>{
      const data=snapshot.val();
      //const getScores=Object.keys(data);
      const listScores:Score[]=[];
      for (let key in data) {
        listScores.push(data[key]);
      }
      //getScores.forEach((key)=>{
        //const value={...data[key],scor:key};
        //listScores.push(value);
     // });
      setScores(listScores);
    })
  }
  const [showModalGame, setShowModalGame]=useState<boolean>(false);
  //const handleStartGame = () => { navigation.navigate('Game'); };

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setFormUser({
      name: auth.currentUser?.displayName ?? "",
    });
    getAllScores();
  }, []);

  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, {
      displayName: formUser.name,
    });
    setShowModalProfile(false);
  };

  const handletSignOut= async()=>{
    await signOut(auth);
    navigation.dispatch(CommonActions.reset({index:0, routes:[{name:'Login'}]}))

  }

  return (
    <>
      <View style={styles.rootHome}>
        <StatusBar style='light' />
        <View style={styles.header}>
          <Avatar.Icon size={34} icon="folder"/>
          <View >
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>{userAuth?.displayName}</Text>
          </View>
          <View style={styles.iconEnd}>
            <IconButton
              icon="account-circle"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
        {/* <FlatList
            data={scores}
            //renderItem={({ item }) => <ScoreCardComponent score={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </View>
        <View style={styles.container}>
          <Text variant='headlineLarge' style={styles.title}>Juego de Memoria</Text>

          <Button mode='contained' onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Game"}))}>Comenzar Juego</Button>
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
          <View style={styles.modalProfile}>
            <Text variant='headlineMedium'>Mi Perfil</Text>
            <View style={styles.iconEnd}>
              <IconButton icon='close-circle-outline' size={20} onPress={() => setShowModalProfile(false)} />
            </View>
          </View>
          <Divider />
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name}
            onChangeText={(value) => handlerSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label='Correo'
            value={userAuth?.email!}
            disabled
          />
          <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
          <View style={styles.iconSignOut}>
          <IconButton 
          icon="logout" 
          size={30} 
          onPress={ handletSignOut} />
          </View>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabMessage}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Score"}))}
      />
    </>
  );
}
