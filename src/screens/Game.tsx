import * as React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { styles } from '../theme/styles'
import { StatusBar } from 'expo-status-bar'
import { Card } from './Card'

const cards=[
   
    "👨‍💻",
    "🌐",
    "💻",
    "🖥️",
    "📲",
    "📱"
];


export const Game= ()=> {

    const [board,SetBoard]=React.useState(()=>shuffle([...cards,...cards]))
    const [selectedCards,setSelectedCards]=React.useState([]);
    const [matchedCards,setMatchedCards]=React.useState([]);
    const [Score,setScore]=React.useState(0);

    /*const handleTapCard =(index)=>{
        if(selectedCards.length >= 2 || selectedCards.includes(index)) return;
        setSelectedCards([...selectedCards,index]);
        setScore(Score+1);*/
       };

  return (
    <View style={styles.container}> 
    <Text style={styles.title}>Memory</Text>
    <View style={styles.board}>
    {board.map((card,index)=>{
        const isTurnedOver= 
            selectedCards.includes(index)  || matchedCards.includes(index);
         return <Card 
         key={index}
         isTurnedOver={isTurnedOver}
         onPress={()=>handleTapCard(index)}
         
         >{card} </Card> ; 
    })}
    </View>
    <StatusBar style='light'/>
    </View>

  );
}


//Función para revolver las cartas
function shuffle(array: any[]){
    for(let i =array.length -1; i>0; i --){
        const randomIndex = Math.floor(Math.random()*(i+1));

        //cambiando los elemntos i al randomIndex
        [array[i], array[randomIndex]]=[array[randomIndex],array[i]];
    }
    return array;
}