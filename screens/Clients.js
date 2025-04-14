import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ClientCard from '../components/clientCard';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../src/FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [etapa, setEtapa] = useState('All');

    const fetchClients = async () => {
        let q;
        if (etapa === 'All'){
            q = query(collection(db, 'prospectos'))
        } else {
            q = query(collection(db, 'prospectos'), where('etapa','==',etapa))
        }
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(docs);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchClients();
        }, [etapa])
    );

    const etapas = [
        {id : 1, titulo: 'All'},
        {id : 2, titulo: 'New contact'},
        {id : 3, titulo: 'In Follow-Up'},
        {id : 4, titulo: 'Closed'},
        {id : 5, titulo: 'Lost'},
    ]

    return (
        <View style={{flex:1, marginBottom: 0}}>
            <Text style={styles.title}>Clients</Text>
            <View style={{marginBottom:5}}>
                <FlatList
                    data={etapas}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <TouchableOpacity style={styles.boton} onPress={() => {setEtapa(item.titulo) }}>
                        <Text style={styles.texto}>{item.titulo}</Text>
                    </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
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
        color: '#1C1C1E',
        marginBottom: 5
    },
    boton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 17,
        marginHorizontal: 3,
    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
    },
})
export default Clients;