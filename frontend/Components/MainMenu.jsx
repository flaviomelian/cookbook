import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/cook.png';

const MainMenu = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText} onPress={() => navigation.navigate('Cooks')}>Recetas de la comunidad</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText} onPress={() => navigation.navigate('AddUpdateCook')}>Mis Recetas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText} onPress={() => navigation.navigate('AddUpdateCook')}>Crear Receta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 40,
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#008AE1',
    },
    button: {
        backgroundColor: '#000166',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default MainMenu
