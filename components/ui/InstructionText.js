import { Text, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'

function InstructionText({children, style}) {
    // using style that is come as a prop and use it
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    },
})

export default InstructionText