import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ClientCard from '../components/clientCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../src/FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const Clients = () => {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const querySnapshot = await getDocs(collection(db, 'prospectos'));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(docs);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchClients();
        }, [])
    );

    return (
        <View style={{flex:1, marginBottom: 0}}>
            <Text style={styles.title}>Clients</Text>
            <FlatList
                data={clients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ClientCard
                        id={item.id}
                        nombre={item.nombre}
                        empresa={item.empresa}
                        contacto={item.contacto}
                        etapa={item.etapa}
                        refreshClients={fetchClients}
                    />
                )}
            />
        </View>
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
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#999',
    }
})
export default Clients;