import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Colors from '../../constants/colors'

function NumberContainer({ children }) {
    return <View style={styles.container}>
        <Text style={styles.numberText}>{ children }</Text>
    </View>
}

export default NumberContainer

const deviceWidh = Dimensions.get('window').width

const styles = StyleSheet.create({
    container:{
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidh < 380 ? 12 : 24,
        margin: deviceWidh < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidh < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold',
    }
})