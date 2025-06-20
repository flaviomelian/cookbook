import { useState, useEffect, use } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, BackHandler } from 'react-native';
import icon from '../assets/cook.png';
import description from '../assets/description.png';
import grocery from '../assets/grocery.png';
import StarRating from './StarRating';
import { postComment } from '../services/commentsService';
import { getAllCommentsFromCook } from '../services/commentsService';
import { useAuth } from '../Context/AuthContext';


const CookDetails = ({ route }) => {
    const { cook } = route.params;
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [comfy, setComfy] = useState(false);
    const user = useAuth();

    const dismissKeyboard = () => {
        setComfy(false)
        Keyboard.dismiss();
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setComfy(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setComfy(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getAllCommentsFromCook(cook.id);
                if (response.status === 200) setComments(response.data);
                else console.error('Error fetching comments:', response.status);
                console.log('Comments fetched:', comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();

        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#003f8e', padding: 10, borderRadius: 5, }}>
                    <Image source={icon} style={{ marginRight: 10 }} />
                    <View style={styles.titleRate}>
                        <Text style={styles.title}>{cook.name}</Text>
                        <StarRating rating={cook.rating} />
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={description} style={{ marginRight: 10 }} />
                        <Text style={styles.header}>Descripción:</Text>
                    </View>
                    <Text style={styles.text}>{cook.description}</Text>
                </View>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={grocery} style={{ marginRight: 10 }} />
                        <Text style={styles.header}>Ingredientes:</Text>
                    </View>
                    {cook.ingredients.split('|').map((step, index) => (
                        <Text key={index} style={styles.text}>- {step}</Text>
                    ))}
                </View>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={icon} style={{ marginRight: 10 }} />
                        <Text style={styles.header}>Pasos:</Text>

                    </View>
                    {cook.steps.split('|').map((step, index) => (
                        <Text key={index} style={styles.text}>- {step}</Text>
                    ))}
                </View>
                <View style={styles.comments}>
                    <Text style={styles.titleAlt}>¡Deja un comentario!</Text>
                    <TextInput
                        placeholder="Escribe qué te parece esta receta"
                        placeholderTextColor="#a0a8d0"
                        value={comment}
                        onChangeText={setComment}
                        onFocus={() => setComfy(true)}
                        onBlur={() => setComfy(false)}
                    />
                    {comment && (<TouchableOpacity style={[styles.favourite, { marginLeft: 60 }]} onPress={() => {
                        postComment({ cook: cook.id, content: comment, userId: user.id, createdAt: new Date().toISOString() });
                        alert(`Comentario enviado: ${comment}`);
                        setComment('');
                    }}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>)}
                    <View style={{
                        borderBottomColor: '#003f8e', // color gris claro
                        borderBottomWidth: 1,
                        marginVertical: 10,
                    }} />
                    <View style={[styles.comments, {backgroundColor: '#006AFD', padding: 10}]}>
                        <Text style={[styles.titleAlt, { fontSize: 18 }]}>Comentarios:</Text>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <>
                                    <Text>{comment.userEmail}</Text>
                                    <Text key={index} style={styles.text}>- {comment.content}</Text>
                                </>
                            ))
                        ) : (
                            <Text style={styles.text}>No hay comentarios aún.</Text>
                        )}
                    </View>
                </View>
                {comfy ? <View style={{ height: 150 }}></View> : <></>}
                <TouchableOpacity style={styles.favourite} onPress={() => navigation.navigate('AddUpdateCook')}>
                    <Text style={styles.textButton}><Text style={styles.star}>★</Text>Marcar como favorita</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 80,
        paddingBottom: 110,
        backgroundColor: '#008AE1',
    },
    titleRate: {
        flex: 1,
        direction: 'row',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0070f0',
    },
    titleAlt: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003f8e',
    },
    comments: {
        borderWidth: 2,
        borderColor: '#003f8e',
        marginBottom: 20,
        borderRadius: 20,
        padding: 10
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
        color: '#000166',
    },
    header: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#0055ff',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#003f8e',
        padding: 10,
        borderRadius: 5,
    },
    favourite: {
        width: 200,
        backgroundColor: '#003f8e',
        borderRadius: 10,
        marginLeft: 75,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 7,
        paddingRight: 12,
    },
    textButton: {
        color: 'white',
        marginBottom: 10,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    star: {
        fontSize: 20,
        color: '#d6d15a',
    },
});

export default CookDetails;
