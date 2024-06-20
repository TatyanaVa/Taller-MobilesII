import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from '../theme/styles';
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface iniciar sesion
interface FormLogin {
  email: string;
  password: string;
}
interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}
export const LoginScreen = () => {
  //Hook useState cambiar el estado del fomulario
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  //Hokk useState -visualizar u ocultar un mensaje
  const [showMessage, setShowMessage] = useState<MessageSnackBar>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //hook useState: para visualizar la contraseña
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //hook useNavigation -navegar en screens
  const navigation = useNavigation();

  //funcion para cambiar los datos del formulario ya que inicialmente estan vacios
  const handlerSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  };

  //funcion encargada enviar-consultar el usuario
  const handlerFormLogin = async () => {
    //validar datos en el formulario
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos !",
        color: "#8f0e1a",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      navigation.dispatch(CommonActions.navigate({ name: "Home" }));
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: "Usuario y/o contraseña incorrecta!",
        color: "#8f0e1a",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Iniciar Sesión</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues("email", value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues("password", value)}
      />
      <Button style={styles.button} mode="contained" onPress={handlerFormLogin}>
        Iniciar
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Register" }))
        }
      >
        No tienes una cuenta? Regístrate ahora!
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
