import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UDModal from './UDModal';

const ClientCard = ({id, nombre, empresa, contacto, etapa, refreshClients}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ItemId, setItemId] = useState(null);
    
    const handleOpenModal = (id) => {
        setItemId(id);
        setModalVisible(true)
    }

    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, {width: 285}]}>{nombre}</Text>
                <TouchableOpacity onPress={() => { handleOpenModal(id)}}>
                    <View style={styles.modalButton}> 
                        <Text style={{ top: 0.5, fontSize: 20, padding: 5}}>⋮</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Company: {empresa}</Text>
            <Text style={styles.text}>Contact: {contacto}</Text>
            <Text style={[styles.text, {color: getEtapaColor(etapa), fontWeight: 'bold',}]}>{etapa}</Text>
            <UDModal
                id = {ItemId}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                refresh={refreshClients}
                />
        </View>
    )
    
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        elevation: 3,
        marginHorizontal: 16,
        position: 'relative'
    }, 
    title:{
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
    },
    modalButton: {
        width:25,
        height:25,
        borderRadius:12.5, 
        backgroundColor : '#e1e1e1', 
        justifyContent: 'center', 
        alignItems: 'center',  
        alignSelf: 'flex-end'
    }
})

const getEtapaColor = (etapa) => {
    switch (etapa.toLowerCase()) {
        case 'new contact':
            return '#3B82F6';
        case 'in follow-up':
            return '#F59E0B';
        case 'closed':
            return '#10B981';
        case 'lost':
            return '#EF4444'
        default:
            return '#6B7280';
    }
};

export default ClientCard;