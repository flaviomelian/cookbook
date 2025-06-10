import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import account from '../assets/account.png';
import lock from '../assets/lock.png';
import emailIcon from '../assets/email.png'; // asegúrate de tener este ícono

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = () => {
        // Aquí iría la lógica de registro
        console.log('Signup:', name, email, password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Registro</Text>
                <View style={styles.inputs}>
                    <View style={styles.inputImage}>
                        <Image style={styles.icon} source={account} />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Nombre"
                            placeholderTextColor="#a0a8d0"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputImage}>
                        <Image style={styles.icon} source={emailIcon} />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Email"
                            placeholderTextColor="#a0a8d0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputImage}>
                        <Image style={styles.icon} source={lock} />
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
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#70a1ff' }}>
                        ¿Ya tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#000166' }}>Inicia sesión</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008AE1',
        justifyContent: 'center',
        padding: 10,
    },
    form: {
        backgroundColor: '#003f8e',
        padding: 40,
        borderRadius: 20,
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
        borderRadius: 10,
    },
    inputImage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        color: '#0070f0',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default Signup;
