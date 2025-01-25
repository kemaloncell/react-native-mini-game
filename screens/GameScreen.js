import { Text, StyleSheet, View } from 'react-native'
import Title from '../components//ui/Title';
import { useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';

function GameScreen({ userNumber }) {
    const initalNumber = generateRandomNumber(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initalNumber)

    function generateRandomNumber(min, max, exclude) {
        // Math.random() may produce  0 so I added min if it is become 0
        const rndNum = Math.floor(Math.random() * (max - min)) + min

        if(rndNum === exclude) {
            return generateRandomNumber(min, max, exclude)
        } else {
            return rndNum
        }
    }


    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
         <View>
            <Text>Higher or lower?</Text>
           {/* + - */}
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