import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import account from '../assets/account.png';
import lock from '../assets/lock.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Aquí iría la lógica de login
        console.log('Login:', username, password);
    };

    return (
        <View style={styles.container} >
            <View style={styles.form}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <View style={styles.inputs}>
                    <View style={styles.inputImage}>
                        <Image style={{ width: 30, height: 35, marginRight: 10 }} source={account} />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Usuario"
                            placeholderTextColor="#a0a8d0"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputImage}>
                        <Image style={{ width: 25, height: 30, marginRight: 10, marginLeft: 3 }} source={lock} />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#a0a8d0"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.textButton}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#70a1ff' }}>
                        ¿No tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#000166' }}>Regístrate</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008AE1',  // azul oscuro fondo
        justifyContent: 'center',
        padding: 10,
    },
    form: {
        backgroundColor: '#003f8e',
        padding: 50,
        borderRadius: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0070f0',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000166',
        padding: 3,
        fontWeight: 'bold',
        borderRadius: 8,
        marginBottom: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        margin: 9,
    },
    inputs: {
        paddingLeft: 30,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#000166',
        borderRadius: 10
    },
    inputImage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input:{
        color: '#0070f0',
    }
})

export default Login