import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../src/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Add = () => {
    const [nombre, setNombre] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [contacto, setContacto] = useState('');

    const Submit = () => {
        Keyboard.dismiss();
        if (!nombre || !empresa || !contacto) {
            return alert("Fill all the fields before saving");
        }
        const nuevoProspecto = {
          nombre,
          empresa,
          contacto,
          etapa: 'New contact'
        };
        try{
            addDoc(collection(db, 'prospectos'), nuevoProspecto)
            setNombre('');
            setEmpresa('');
            setContacto('');
            
        } catch (error) {
            console.error('Error saving client:', error);
        }
        
        alert("Client Saved");
      };
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View >
            <Text style={ styles.title }>Add Client</Text>
            <View style={ styles.form }>
                <View style={ styles.row }>
                    <Text style={ styles.label}>Name:</Text>
                    <TextInput
                        style={ styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Type a Name"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Company:</Text>
                    <TextInput
                        style={ styles.input}
                        value={empresa}
                        onChangeText={setEmpresa}
                        placeholder="Type the company"
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Contact:</Text>
                    <TextInput
                        style={ styles.input}
                        value={contacto}
                        onChangeText={setContacto}
                        placeholder="Phone number or Email"
                    />
                </View >
                <View style={{ flexDirection: 'row', height: 65, padding: 10}}>
                    <View style={{ marginTop:12 }}>
                        <Text style={styles.label}>Stage:</Text>
                    </View>
                    <View style={ styles.stageView}>
                        <Text style={{fontWeight:'bold', fontSize: 18}}>New Contact</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity 
                style={ styles.button }
                onPress={Submit}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
            </TouchableOpacity>  
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: '15%', 
        fontWeight: '600', 
        color: '#1C1C1E' 
    },
    form: {
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginHorizontal: 16,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10 
    },
    label: {
        fontSize: 16,
        color: '#1C1C1E',
        width: 90,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: '#F2F2F1',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 120,
        marginTop: 30,
    }, 
    stageView:{
        marginLeft: 10, 
        borderColor:'#007AFF', 
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 10, 
        backgroundColor: '#F2F2F1', 
        width:192, 
        alignItems:'center'
    }
})

export default Add;