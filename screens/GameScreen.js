import { StyleSheet, View, Alert, Text, FlatList } from 'react-native'
import Title from '../components//ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card'
import GuessLogItem from '../components/game/GuessLogItem';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'

function generateRandomNumber(min, max, exclude) {
    // Math.random() may produce  0 so I added min if it is become 0
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if(rndNum === exclude) {
        return generateRandomNumber(min, max, exclude)
    } else {
        return rndNum
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initalGuess = generateRandomNumber(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initalGuess)
    const [guessRounds, setGuessRounds] = useState([initalGuess])

    const guessRoundsListLength = guessRounds.length
    // the code above initalGuess and current guess will be exucute before useEffect!!!! so we dont use 
    // dynamic variable here, for min and max boundary we have to use hardcoded 

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction) {
        if(
            (direction === 'lower' && currentGuess < userNumber ) ||
            (direction === 'greater' && currentGuess > userNumber )
         ){
            Alert.alert("Don't lie", "You know that number is not correct", [
                { text:'Sorry!', style:'cancel' }
            ])
            return;
         }

        if(direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNum = generateRandomNumber(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNum)
        setGuessRounds(prevGuessRounds => [newRndNum, ...prevGuessRounds])
    }


    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
         <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name='remove' size={24} color='white'/>
            </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                 <Ionicons name='add' size={24} color='white'/>
            </PrimaryButton>
            </View>
          </View>
         </Card>
         <View style={styles.listContainer}>
            <FlatList
             data={guessRounds}
             renderItem={(itemData) => <GuessLogItem 
                roundNumber={guessRoundsListLength - itemData.index} 
                guess={itemData.item}/>}
             keyExtractor={(item) => item}
            />
         </View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },

    buttonsContainer: {
        flexDirection: 'row'
    },

    instructionText: {
        marginBottom: 12
    },

    buttonContainer: {
        flex:1
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
});