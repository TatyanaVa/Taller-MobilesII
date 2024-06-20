import React from 'react';
import { Appbar, IconButton, Text } from 'react-native-paper';
import { Score } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { styles } from '../../theme/styles';

interface Props{
    score:Score;
}

export const ScoreCardComponent = () => {
    const navigation=useNavigation();
    return (
        <View style={styles.rootHome}>
            <Appbar.BackAction onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Home"}))} />
        <Text style={styles.modalText}>Scores: </Text>
        </View>
        )
    }