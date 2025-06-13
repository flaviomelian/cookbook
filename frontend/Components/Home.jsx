import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/cook.png';

const Home = () => {

    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bienvenido a Cookbook</Text>
            <Text style={styles.text}>
                Gestiona tus recetas de cocina de forma fácil y rápida. Crea nuevas recetas, organiza por categorías, agrega ingredientes y pasos para que nunca olvides ningún detalle.
            </Text>
            <Text style={styles.text}>
                Comparte tus recetas favoritas con otros usuarios y colabora en cocinas conjuntas para descubrir nuevos sabores y mejorar tus platos.
            </Text>
            <View style={styles.list}>
                <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 5 }}>
                    <Image source={icon} style={{ marginRight: 10, width: 30 }} />
                    <Text style={styles.listItem}><Text style={styles.bold}>Organiza</Text> tus recetas por categorías (Entrantes, Postres, etc.)</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 5 }}>
                    <Image source={icon} style={{ marginRight: 10, width: 30 }} />
                    <Text style={styles.listItem}><Text style={styles.bold}>Crea</Text> recetas con nombre, ingredientes y pasos detallados</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 5 }}>
                    <Image source={icon} style={{ marginRight: 10, width: 30 }} />
                    <Text style={styles.listItem}><Text style={styles.bold}>Organiza</Text> tus recetas por categorías (Entrantes, Postres, etc.)</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 5 }}>
                    <Image source={icon} style={{ marginRight: 10, width: 30 }} />
                    <Text style={styles.listItem}><Text style={styles.bold}>Comparte</Text> y recibe recetas con la comunidad de usuarios</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 5 }}>
                    <Image source={icon} style={{ marginRight: 10, width: 30 }} />
                    <Text style={styles.listItem}><Text style={styles.bold}>Colabora</Text> con otros usuarios que cocinan y comparten contigo</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { }}
            >
                <Text style={styles.buttonText} onPress={() => navigation.navigate('AddUpdateCook')}>¡Comienza a crear tu receta!</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 40,
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#008AE1',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000166',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#000166',
        marginBottom: 10,
        lineHeight: 22,
    },
    list: {
        marginVertical: 15,
        padding: 15,
        backgroundColor: '#003f8e',
        borderRadius: 10,
    },
    listItem: {
        fontSize: 16,
        color: '#000166',
        marginBottom: 10,
        width: 300,
    },
    bold: {
        fontWeight: '700',
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

export default Home;
