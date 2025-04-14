import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Add from "./screens/Add";
import Clients from "./screens/Clients";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            initialRouteName="Clients"
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',    
            }}>
                <Tab.Screen name="Clients" component={Clients}
                    options={{
                        tabBarIcon: ({color,size}) => {
                            return <FontAwesome name="users" size={24} color={color} />
                        },
                        headerShown: false,
                        
                    }}/>
                <Tab.Screen name="Add" component={Add}
                    options={{
                        tabBarIcon: ({color,size}) => {
                            return <AntDesign name="pluscircle" size={24} color={color} />
                        },
                        headerShown: false,
                        
                    }}/>
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}