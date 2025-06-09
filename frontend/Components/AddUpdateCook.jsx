import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { postCook, updateCook } from '../services/cookService.js'

const AddUpdateCook = ({ route, navigation }) => {

    const { cook } = route.params || {}

    const [cookName, setCookName] = useState('')
    const [description, setDescription] = useState('')
    const [numOfSteps, setNumOfSteps] = useState('')
    const [numOfIngredients, setNumOfIngredients] = useState('')
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        // Si hay cook (modo edición), inicializa los estados con sus valores
        if (cook) {
            setCookName(cook.name)
            setDescription(cook.description)
            setSteps(cook.steps ? cook.steps.split('|') : [])
            setIngredients(cook.ingredients ? cook.ingredients.split('|') : [])
            setSelectedCategory(cook.category || '')
            setNumOfSteps(cook.steps ? cook.steps.split('|').length : 0)
            setNumOfIngredients(cook.ingredients ? cook.ingredients.split('|').length : 0)
        }
    }, [cook])

    const managePostCook = async () => {
        const cookData = {
            name: cookName,
            description: description,
            steps: steps.join('|'),
            ingredients: ingredients.join('|'),
            category: selectedCategory
        }
        try {
            if (cook) {
                // Actualizar receta existente
                await updateCook(cook.id, cookData)
                alert('Receta actualizada con éxito')
            } else {
                // Crear nueva receta
                await postCook(cookData)
                alert('Receta creada con éxito')
                // Resetear formulario si quieres
            }
            navigation.navigate('Cooks')
        } catch (error) {
            alert('Error creando receta')
            console.error(error)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inContainer}>
                <Text style={styles.title}>NUEVA RECETA</Text>
                <TextInput style={styles.input}
                    placeholder="Nombre de la receta"
                    value={cookName}
                    onChangeText={setCookName}
                />
                <TextInput style={styles.input}
                    placeholder="Descripción de la receta"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput style={styles.input}
                    placeholder="Número de pasos"
                    value={numOfSteps}
                    onChangeText={(text) => setNumOfSteps(Number(text))}
                    keyboardType="numeric"
                />
                {numOfSteps > 0 && (
                    <>
                        <Text style={styles.header}>Pasos:</Text>
                        {Array.from({ length: numOfSteps }, (_, index) => (
                            <TextInput style={styles.input}
                                key={index}
                                placeholder={`Paso ${index + 1}`}
                                value={steps[index] || ''}
                                onChangeText={(text) => {
                                    const newSteps = [...steps];
                                    newSteps[index] = text;
                                    setSteps(newSteps);
                                }}
                            />
                        ))}
                        <View style={styles.hr} />
                    </>
                )}
                <TextInput style={styles.input}
                    placeholder="Número de ingredientes"
                    value={numOfIngredients}
                    onChangeText={(text) => setNumOfIngredients(Number(text))}
                    keyboardType="numeric"
                />
                <View style={{ marginBottom: 20 }}>
                    {numOfIngredients > 0 && (
                        <>
                            <Text style={styles.header}>Ingredientes:</Text>
                            {Array.from({ length: numOfIngredients }, (_, index) => (
                                <TextInput style={styles.input}
                                    key={index}
                                    placeholder={`Ingrediente ${index + 1}`}
                                    value={ingredients[index] || ''}
                                    onChangeText={(text) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index] = text;
                                        setIngredients(newIngredients);
                                    }}
                                />
                            ))}
                        </>
                    )}

                </View>
                {(cookName.trim() !== '' &&
                    description.trim() !== '' &&
                    steps.length === numOfSteps &&
                    steps.every(s => s?.trim?.() !== '') &&
                    ingredients.length === numOfIngredients &&
                    ingredients.every(i => i?.trim?.() !== '')
                ) ? (

                    
                        <TouchableOpacity style={styles.button} onPress={managePostCook}>
                            {cook ? (<Text style={styles.button}>ACTUALIZAR RECETA</Text>) : (<Text style={styles.button}>CREAR RECETA</Text>)}
                        </TouchableOpacity>
                ) : null}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#008AE1',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 140,
        marginBottom: 10,
    },
    inContainer: {
        height: '90%',
        backgroundColor: '#003f8e',
        padding: 20,
        borderRadius: 15,
        marginBottom: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0070f0',
        textAlign: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        left: '10%',
        color: '#011947',
    },
    input: {
        height: 40,
        backgroundColor: '#003fae',
        borderWidth: 1,
        width: '80%',
        left: '10%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#000166',
    },
    button: {
        backgroundColor: '#000166',
        color: 'white',
        paddingTop: 10,
        fontWeight: 'bold',
        borderRadius: 8,
        marginBottom: 25,
        alignItems: 'center',
    },
    hr: {
        height: 1,
        backgroundColor: '#888',
        marginVertical: 15,
    },

})

export default AddUpdateCook
