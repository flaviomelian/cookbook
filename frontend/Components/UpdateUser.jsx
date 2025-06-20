import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import account from '../assets/account.png';
import lock from '../assets/lock.png';
import emailIcon from '../assets/email.png';
import languageIcon from '../assets/language.png';
import location from '../assets/location.png';
import { updateUser } from '../services/userService';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/userService'; // Asegúrate de que esta función esté definida en tu servicio

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [user, setUser] = useState({}); // Estado para almacenar los datos del usuario
    const navigation = useNavigation();
    const token = AsyncStorage.getItem('token'); // Asegúrate de que el token esté disponible

    const handleUpdateUser = () => {
        // Validación de campos
        if (!name.trim()) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        if (!password || password.length < 6) setPassword(user.password); // Si no se ingresa una nueva contraseña, se mantiene la actual
        if (!language) {
            alert('Por favor, selecciona un idioma.');
            return;
        }
        // Si tienes el checkbox como obligatorio, descomenta esto:
        // if (!isChecked) {
        //     alert('Debes aceptar compartir tu ubicación.');
        //     return;
        // }

        updateUser(user.id, name, email, password, language, user.level, token);
        navigation.navigate('Profile');
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    Alert.alert('Error', 'No se encontró el ID de usuario.');
                    return;
                }
                const data = await getUser(userId);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
            }
        };

        fetchDataUser();
    }, []);

    useEffect(() => {
        if (user && user.name) setName(user.name);
        if (user && user.email) setEmail(user.email);
        if (user && user.language) setLanguage(user.language);
        // Si tienes más campos, agrégalos aquí
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Actualizar datos</Text>
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
                <TouchableOpacity style={styles.update} onPress={handleUpdateUser}>
                    <Text style={styles.buttonText}>Actualizar</Text>
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
    update: {
        backgroundColor: '#dddd00',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        margin: 'auto',
        marginTop: 30,
        borderRadius: 10,
        width: '80%',
    },
    buttonText: {
        color: '#F8F9FA',
        textShadowColor: 'rgba(0, 0, 0, 0.61)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        fontSize: 14
    }
});

export default UpdateUser;
