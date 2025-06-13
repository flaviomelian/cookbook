import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating }) => {

    const getStarRating = (rating) => {
        rating /= 10;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return {
            fullStars,
            halfStar,
            emptyStars
        };
    };

    const { fullStars, halfStar, emptyStars } = getStarRating(rating);

    return (
        <View style={{ flexDirection: 'row' }}>
            {[...Array(fullStars)].map((_, i) => (
                <Text key={`full-${i}`} style={styles.star}>★</Text>
            ))}
            {halfStar === 1 && (
                <View style={styles.halfStarContainer}>
                    <Text style={styles.star}>★</Text>
                    <View style={styles.halfOverlay} />
                </View>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Text key={`empty-${i}`} style={styles.star}>☆</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    star: {
        fontSize: 24,
        color: '#d6d15a', 
        marginHorizontal: 2,
    },
    halfStarContainer: {
        position: 'relative',
        width: 24,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starBackground: {
        color: '#FFD700',
    },
    halfOverlay: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#003f8e', // Mismo color de fondo
        left: '55%',
        top: '0%',
    },
});

export default StarRating;