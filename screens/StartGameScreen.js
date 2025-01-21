import {View, TextInput, StyleSheet} from 'react-native'
import PrimaryButton from '../components/PrimaryButton';
import { useState } from 'react';

function StartGameScreen() {

    const [enteredNumber, setEnteredNumber] = useState('')

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function confirmButtonHandler() {
        console.log('clicked',enteredNumber)
    }


    return (
        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.numberInput} 
            maxLength={2}
            keyboardType='number-pad'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredNumber}
            />
         <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmButtonHandler}>Confirm</PrimaryButton>
            </View>
         </View>
        </View>
    );
}

export default StartGameScreen

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        marginHorizontal: 24,
        marginTop:100,
        padding:16,
        backgroundColor: '#4e0329',
        borderRadius: 8,
        elevation: 4, // shadow android only
        shadowColor: 'black',
        shadowOffset: { width:0 , height:2 },
        shadowRadius: 6,
        shadowOpacity: 0.25 
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonsContainer: {
        flexDirection: 'row'
    },

    buttonContainer: {
        flex:1
    },

})