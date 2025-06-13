import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenu = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Cooks')}
            >
                <Text style={styles.buttonText}>Recetas de la comunidad</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Cooks', { id: 1 })}
            >
                <Text style={styles.buttonText}>Mis Recetas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddUpdateCook')}
            >
                <Text style={styles.buttonText}>Crear Receta</Text>
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
