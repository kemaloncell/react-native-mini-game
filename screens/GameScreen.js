import { Text, StyleSheet, View, Alert } from 'react-native'
import Title from '../components//ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

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
    // the code above initalGuess and current guess will be exucute before useEffect!!!! so we dont use 
    // dynamic variable here, for min and max boundary we have to use hardcoded 

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

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
    }


    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
         <View>
            <Text>Higher or lower?</Text>
          <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
          </View>
         </View>
         <View>{/*LOG ROUNDS*/}</View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },

});