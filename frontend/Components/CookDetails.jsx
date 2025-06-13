import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import icon from '../assets/cook.png';
import description from '../assets/description.png';
import grocery from '../assets/grocery.png';
import StarRating from './StarRating';

const CookDetails = ({ route }) => {
    const { cook } = route.params;

    return (
        <View style={{ width: '100%', flex: 1, backgroundColor: '#003f8e' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#003f8e', padding: 10, borderRadius: 5, }}>
                    <Image source={icon} style={{ marginRight: 10 }} />
                    <View style={styles.titleRate}>
                        <Text style={styles.title}>{cook.name}</Text>
                        <StarRating rating={cook.rating}/>
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
            </ScrollView>
        </View>

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
});

export default CookDetails;
