import * as React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Provider, Text } from "react-native-paper";
import { styles } from "../theme/styles";
import { StatusBar } from "expo-status-bar";
import { Card } from "./Card";
import { auth} from "../configs/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const easyCards = ["👨‍💻", "🌐", "💻", "🖥️", "📲", "📱"];
const hardCards=["⌨️","🎮","⚠️","👨‍💻", "🌐", "💻", "🖥️", "📲", "📱"];

/*onst shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};*/
export const Game: React.FC = () => {
  //nivel de dificultad
  const [difficulty, setDifficulty] = React.useState<"easy" | "hard">("easy");
  const cards = difficulty === "easy" ? easyCards : hardCards;
  //board son todas las tarjetas
  const [board, SetBoard] = React.useState(() => shuffle([...cards, ...cards]));
  //selected mis cartas seleccionadas
  //matched las que ya tienen su par
  const [selectedCards, setSelectedCards] = React.useState<number[]>([]);
  const [matchedCards, setMatchedCards] = React.useState<number[]>([]);
  //tiempo 60 seconds
  const [timeLeft, setTimeLeft] = React.useState(60);
  //score tiempo
  const [Score, setScore] = React.useState(0);
  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;
    //index de la tarjeta seleccionada
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      //poner en cero
      setSelectedCards([]);
    } else {
      //no encontre un par volver a dar la vuelta las cartas que no coinciden
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  React.useEffect(() => {
    if (matchedCards.length === board.length) {
      setModalVisible(true);
    }
  }, [matchedCards]);


  React.useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setModalVisible(true);
    }
  }, [timeLeft]);

  const handleTapCard = (index: number) => {
    //selectedCard es el arreglo que tengo mis tarjetas -
    if (selectedCards.length >= 2 || selectedCards.includes(index!)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(Score + 1);
  };

  //saber si el usuario ganó
  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
    SetBoard(shuffle([...cards, ...cards]));
    setModalVisible(false);
    setTimeLeft(60);
  };
  const changeDifficulty = (level: "easy" | "hard") => {
    setDifficulty(level);
    resetGame();
  };
  /*const saveScore = async () => {
    const user = auth().currentUser;
    if (user) {
      await firestore()
        .collection('scores')
        .add({
          userId: user.uid,
          score: Score,
          difficulty: difficulty,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
    }
  };*/
  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>
          {matchedCards.length === board.length ? "Congratulations 🎉" : "TAC Memory"}
        </Text>
        <Text style={styles.title}>Movimientos: {Score}</Text>
        <Text style={styles.title}>Tiempo restante: {timeLeft}s</Text>
        <Button onPress={() => changeDifficulty("easy")}>Easy</Button>
        <Button onPress={() => changeDifficulty("hard")}>Hard</Button>
        <View style={styles.board}>
          {board.map((card, index) => {
            const isTurnedOver =
              selectedCards.includes(index) || matchedCards.includes(index);
            return (
              <Card
                key={index}
                isTurnedOver={isTurnedOver}
                onPress={() => handleTapCard(index)}
              >
                {card}
              </Card>
            );
          })}
        </View>
        <StatusBar style="light" />
        <Portal>
          <Modal visible={isModalVisible} 
          onDismiss={resetGame} 
          contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalText}>
            {matchedCards.length === board.length ? "Congratulations 🎉 " : "Time's up!"}
            </Text>
            <Button onPress={resetGame}>Reset</Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
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
function firestore() {
  throw new Error("Function not implemented.");
}

