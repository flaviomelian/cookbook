import { useEffect, useState } from 'react'
import { getUser } from '../services/userService'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logout from '../assets/logout.png';

const Profile = () => {

    const navigation = useNavigation();
    const [dataUser, setDataUser] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchDataUser = async () => {
            const data = await getUser(1);
            setDataUser(data);
        };

        if (isAuthenticated) {
            fetchDataUser();
        }
    }, [isAuthenticated]);

    const handleDeleteAccount = async () => {
        console.log('handleDeleteAccount called');
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
                    onPress: async () => {
                        try {
                            // Aquí deberías llamar a tu función real, por ejemplo:
                            // await deleteUserAccount(token);

                            alert('Cuenta eliminada exitosamente.');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch (error) {
                            console.error('Error al eliminar la cuenta:', error);
                            alert('Error al eliminar la cuenta. Inténtalo de nuevo más tarde.');
                        }
                    },
                },
            ]
        );
    };

    const renderData = (data, prefix = '') => {
        return Object.entries(data).map(([key, value]) => {
            const displayKey = prefix ? `${prefix}.${key}` : key;

            // Excluir password
            if (displayKey.includes('password') || displayKey.includes('cooks')) return null;

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
                    {`${displayKey}: ${String(value)}`}
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
                    <TouchableOpacity style={styles.update} onPress={() => navigation.navigate('AddUpdateUser', { user: dataUser })}>
                        <Text style={styles.buttonText}>Actualizar Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.buttonText} onPress={() => handleDeleteAccount()}>Eliminar mi cuenta</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.myCooks, { marginTop: 25, width: 50, height: 50 }]}
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('userId');
                        navigation.navigate({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }}>
                    <Image source={logout} />
            </TouchableOpacity>
        </View>

        </View >

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
        paddingBottom: 30,
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