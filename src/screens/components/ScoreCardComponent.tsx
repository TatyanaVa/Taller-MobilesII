import React, { useState } from "react";
import { Appbar, Button, IconButton, Modal, Portal, Text } from "react-native-paper";
import { CommonActions, RouteProp, useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { styles } from "../../theme/styles";

interface Props{
    showModalScore:boolean;
    setShowModalScore:Function;
}


interface formScore{
    score:number,
}
export const ScoreCardComponent = ({showModalScore, setShowModalScore}:Props) => {
    const [formScore, setFormScore]=useState<formScore>({
        score:0
    });


    const navigation=useNavigation();
    return (
        <Portal>
            <Modal visible={showModalScore} contentContainerStyle={styles.modalProfile}>
                <View style={styles.header} >
                <Text variant="headlineMedium">Puntajes: </Text>
                <IconButton
                icon='close-circle-outline'
                size={30}
                onPress={()=>setShowModalScore(false)}
                />
                </View>
            </Modal>
            
        </Portal>
        )
    }

