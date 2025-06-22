import { useEffect, useState } from 'react'
import { getUser, deleteUserAccount, validatePassword } from '../services/userService' // Asegúrate de tener validatePassword
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoutImg from '../assets/logout.png';

const Profile = () => {

    const navigation = useNavigation();
    const [dataUser, setDataUser] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Estados para el prompt de contraseña
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token, loading, logout } = useAuth();

    useEffect(() => {
        if (!loading)
            if (!token)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            else setIsAuthenticated(true);
    }, [token, loading]);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    Alert.alert('Error', 'No se encontró el ID de usuario.');
                    return;
                }
                const data = await getUser(userId, token);
                setDataUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
            }
        };

        if (isAuthenticated) fetchDataUser();
    }, [isAuthenticated]);

    const handleDeleteAccount = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            alert('No estás autenticado.');
            return;
        }

        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer. Deberá registrarse nuevamente si desea continuar usando la aplicación.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => setShowPasswordPrompt(true),
                },
            ]
        );
    };

    // Nueva función para confirmar borrado con contraseña
    const confirmDelete = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('token');
            // Aquí llamas a tu backend para validar la contraseña
            const isValid = await validatePassword(userId, confirmPassword, token); // Implementa esto en tu servicio
            if (isValid) {
                await deleteUserAccount(userId, token);
                setShowPasswordPrompt(false);
                setConfirmPassword('');
                logout(); // Llama a la función de logout para limpiar el token y redirigir al login
                await AsyncStorage.removeItem('userId');
                alert('Cuenta eliminada exitosamente.');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                Alert.alert('Contraseña incorrecta', 'La contraseña no coincide.');
            }
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            alert('Error al eliminar la cuenta. Inténtalo de nuevo más tarde.');
        }
    };

    const renderData = (data, prefix = '') => {
        return Object.entries(data).map(([key, value]) => {
            const displayKey = prefix ? `${prefix}.${key}` : key;

            // Excluir password
            if (displayKey.includes('password') || displayKey.includes('cooks') || displayKey.includes('role')) return null;

            // Si es clave 'id' dentro de 'cooks' renderiza línea horizontal simulada
            if (key === 'id')
                return <View key={displayKey} style={styles.hr} />;

            // Para otras claves normales
            if (typeof value === 'object' && value !== null)
                return (
                    <View key={displayKey}>
                        <Text style={[styles.data, { fontWeight: 'bold' }]}>{displayKey}:</Text>
                        {renderData(value, displayKey)}
                    </View>
                );
            else return (
                <Text style={styles.data} key={displayKey}>
                    {String(value) === 'null' ? (`${displayKey}: deberias actualizar ${displayKey}`) : (`${displayKey}: ${String(value)}`)}
                </Text>
            );
        });
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.header}>Datos de su perfil:</Text>
                {renderData(dataUser)}
                <TouchableOpacity style={styles.myCooks} onPress={() => navigation.navigate('Cooks', { id: 1 })}>
                    <Text style={styles.buttonText}>Ver mis recetas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actions}>
                <View>
                    <TouchableOpacity style={styles.update} onPress={() => navigation.navigate('UpdateUser', { user: dataUser })}>
                        <Text style={styles.buttonText}>Actualizar Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={handleDeleteAccount}>
                        <Text style={styles.buttonText}>Eliminar mi cuenta</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.myCooks, { marginTop: 25, width: 50, height: 50 }]}
                        onPress={async () => {
                            await logout(); // <-- Usa el método del contexto
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                            setIsAuthenticated(false);
                            alert('Sesión cerrada correctamente.');
                        }}>
                        <Image source={logoutImg} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal para pedir la contraseña */}
            <Modal
                visible={showPasswordPrompt}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setShowPasswordPrompt(false);
                    setConfirmPassword('');
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#008AE1',
                        padding: 20,
                        borderRadius: 10,
                        width: '80%',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 16, marginBottom: 10, color: '#003f8e', fontWeight: 'bold' }}>
                            Introduzca su contraseña para confirmar la eliminación de la cuenta
                        </Text>
                        <TextInput
                            placeholder="Contraseña"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                width: '100%',
                                marginBottom: 15
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#dddd00',
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1,
                                    marginRight: 5
                                }}
                                onPress={() => {
                                    setShowPasswordPrompt(false);
                                    setConfirmPassword('');
                                }}>
                                <Text style={{ color: '#003f8e', textAlign: 'center' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#aa0000',
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1,
                                    marginLeft: 5
                                }}
                                onPress={confirmDelete}>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    background: { backgroundColor: '#008AE1', },
    container: {
        backgroundColor: '#003f8e',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 40,
        marginTop: 70,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
    },
    header: {
        color: 'white',
        fontSize: 24
    },
    hr: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 8,
    },
    myCooks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#000f5f',
        padding: 10,
        borderRadius: 5,
    },
    actions: {
        backgroundColor: '#003f8e',
        marginTop: 10,
        marginBottom: 50,
        marginLeft: 15,
        marginRight: 15,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    update: {
        backgroundColor: '#dddd00',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        marginTop: 7,
        borderRadius: 10,
    },
    delete: {
        backgroundColor: '#aa0000',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        marginTop: 17,
        borderRadius: 10,
    },
    data: {
        color: 'white',
        fontSize: 16,
    },
    buttonText: {
        color: '#F8F9FA',
        textShadowColor: 'rgba(0, 0, 0, 0.61)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        fontSize: 14
    }
})