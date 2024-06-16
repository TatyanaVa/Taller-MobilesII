import * as React from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../theme/styles';

interface CardProps {
  children: React.ReactNode;
  isTurnedOver:boolean,
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({ children, isTurnedOver, onPress }) => {
  return (
    <Pressable 
    onPress={onPress} 
    style={isTurnedOver? styles.cardUp:styles.cardDown }>
      {isTurnedOver ? (
      <Text style={styles.textCard}>{children}</Text>
      ):(
        <Text style={styles.textCard}>?</Text>
    )}
    </Pressable>
  );
};

