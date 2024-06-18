import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../theme/styles";
import { StatusBar } from "expo-status-bar";
import { Card } from "./Card";

const cards = ["👨‍💻", "🌐", "💻", "🖥️", "📲", "📱"];

export const Game: React.FC = () => {
    //board son todas las tarjetas
  const [board, SetBoard] = React.useState(() => shuffle([...cards, ...cards]));
  //selected mis cartas seleccionadas
  const [selectedCards, setSelectedCards] = React.useState([]);
  //matched las que ya tienen su par
  const [matchedCards, setMatchedCards] = React.useState([]);
  //score tiempo
  const [Score, setScore] = React.useState(0);

  React.useEffect(()=>{
    if(selectedCards.length<2)return;
    //index de la tarjeta seleccionada
    if(board[selectedCards[0]] === board[selectedCards[1]]){
        setMatchedCards({...matchedCards,...selectedCards})
        //poner en cero
        setSelectedCards([]);
    }else{
        //no encontre un par volver a dar la vuelta las cartas que no coinciden
        const timeoutId=setTimeout(()=>setSelectedCards([]),1000);
        return ()=>clearTimeout(timeoutId);
    }
  }, [selectedCards])

  const handleTapCard = (index:never) => {
    //selectedCard es el arreglo que tengo mis tarjetas - 
    if (selectedCards.length >= 2 || selectedCards.includes(index!)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(Score + 1);
  };

  //saber si el usuario ganó
  const didPlayerWin = () => matchedCards.length === board.length;
  const resetGame=()=> {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
    SetBoard(shuffle([...cards, ...cards]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? "Congratulations 🎉" : " TAC Memory"}
      </Text>
      <Text style={styles.title}>Movimientos: {Score} </Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
          //si las cartas seleccionadas incluye el idex signifca que esta seleccionada
            selectedCards.includes(index!) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}
            >
              {card}{" "}
            </Card>
          );
        })}
      </View>
      {didPlayerWin() && <Button onPress={resetGame}>Reset</Button>}
      <StatusBar style="light" />
    </View>
  );
};

//Función para revolver las cartas
function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    //cambiando los elemntos i al randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
