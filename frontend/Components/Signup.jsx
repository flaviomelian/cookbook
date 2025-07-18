import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import account from '../assets/account.png';
import lock from '../assets/lock.png';
import emailIcon from '../assets/email.png';
import languageIcon from '../assets/language.png';
import location from '../assets/location.png';
import { signup } from '../services/userService';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();

    const handleSignup = () => {
        // Validación de campos
        if (!name.trim()) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        if (!password || password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (!language) {
            alert('Por favor, selecciona un idioma.');
            return;
        }
        // Si tienes el checkbox como obligatorio, descomenta esto:
        // if (!isChecked) {
        //     alert('Debes aceptar compartir tu ubicación.');
        //     return;
        // }

        signup(name, email, password, language, 'COCINILLAS');
        alert('Registro exitoso. Por favor, inicia sesión.');
        navigation.navigate('Login');
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
                    <View style={styles.inputImage}>
                        <Image style={styles.language} source={languageIcon} />
                        <Picker
                            selectedValue={language}
                            style={{ flex: 1, color: '#0070f0', backgroundColor: 'transparent' }}
                            onValueChange={(itemValue) => setLanguage(itemValue)}
                            dropdownIconColor="#0070f0"
                        >
                            <Picker.Item label="Seleccionar" value="" />
                            <Picker.Item label="Español" value="es" />
                            <Picker.Item label="Inglés" value="en" />
                            <Picker.Item label="Francés" value="fr" />
                            <Picker.Item label="Alemán" value="de" />
                        </Picker>
                    </View>
                    <View style={styles.inputImage}>
                        <Image style={styles.icon} source={location} />
                        <CheckBox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            tintColors={{ true: '#0070f0', false: '#ccc' }}
                            style={{ marginRight: 10 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#fff' }}>Compartir tu ubicación en tiempo real</Text>
                        </View>
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
        paddingHorizontal: 1,
    },
    input: {
        color: '#0070f0',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    language: {
        width: 35,
        height: 35,
    },
});

export default Signup;
