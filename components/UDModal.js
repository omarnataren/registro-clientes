import React, { useState } from 'react';
import { Alert, View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../src/FirebaseConfig';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';

const UDModal = ({ id, visible, onClose, refresh }) => {
    const [etapa, setEtapa] = useState('etapa');

    const showConfirmation = () => {
        Alert.alert(
          'Confirmar acción',
          '¿Estás seguro de que quieres eliminar este cliente?',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancelado'),
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              onPress: () => deleteClient(),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      };

    const editClient = async () => {
        try {
            const clientRef = doc(db, 'prospectos', id);
            await updateDoc(clientRef, {
            etapa: etapa
            });
            onClose();
            refresh();
        } catch (error) {
            console.error('Error updating client:', error);
        } 
    };
    
    const deleteClient = async  () => {
        try {
            await deleteDoc(doc(db, 'prospectos', id));
            onClose();
            refresh();
        } catch (error) {
            console.error('Error deleting client:', error);
        }   
    };

    return (
        <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',}}>
                <View style={styles.card}>
                    <View style={styles.headerCard }>
                        <Text style={{ fontSize: 25, color: '#1C1C1E', fontWeight:'bold' }}>Options</Text>
                        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', right: 5, top: 5 }}>
                            <View style={styles.closeButton}> 
                                <Text style={{ bottom: 1, fontSize: 20 }}>x</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 15, marginHorizontal: 15}}>
                        <Text style={{ fontSize: 18, color: '#1C1C1E', marginBottom: 10,  }}>Change stage:</Text>
                        <View style={styles.pickerView}>
                            <Picker
                                selectedValue={etapa}
                                onValueChange={(itemValue) => setEtapa(itemValue)}
                                style={{ height: 50, width: '100%', color: '#FFF', marginBottom:125, marginTop:-40 }}
                                dropdownIconColor="#1C1C1E"
                            >
                                <Picker.Item label="New contact" value="New contact" color="#1C1C1E" />
                                <Picker.Item label="In Follow-Up" value="In Follow-Up" color="#1C1C1E" />
                                <Picker.Item label="Closed" value="Closed" color="#1C1C1E" />
                                <Picker.Item label="Lost" value="Lost" color="#1C1C1E" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity 
                            style={ [styles.button, {backgroundColor: '#007AFF',  marginRight:20 }] }
                            onPress={editClient}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={ [styles.button, {backgroundColor: '#e20000'}] }
                            onPress={showConfirmation}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>     
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    card:{
        flex: 1, 
        marginHorizontal:40,
        marginVertical:220, 
        backgroundColor:'#fff', 
        borderRadius:24, 
        padding: 10
    },
    headerCard:{
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative', 
        paddingVertical: 10
    },
    closeButton:{
        width:30, 
        height:30, 
        borderRadius: 15, 
        backgroundColor : '#e1e1e1', 
        justifyContent: 'center', 
        alignItems: 'center',  
        alignSelf: 'flex-end'
    },
    pickerView:{
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8, 
        overflow: 'hidden', 
        backgroundColor: '#F9F9F9',
    },
    button: {
        padding:15,
        width:110,
        alignItems: 'center',
        borderRadius: 15,
    }
})

export default UDModal;