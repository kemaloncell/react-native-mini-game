import { View, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/colors'

function Card({children}) {
    return <View style={styles.card}>{children}</View>
}

const deviceWidh = Dimensions.get('window').width

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        marginTop: deviceWidh < 380 ? 18 : 36,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, // shadow android only
        shadowColor: 'black',
        shadowOffset: { width:0 , height:2 },
        shadowRadius: 6,
        shadowOpacity: 0.25 
    },
})

export default Card