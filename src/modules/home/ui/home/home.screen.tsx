import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {observer} from "mobx-react-lite";
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {useSectionContext} from "@/src/modules/section/use-section-context";

export const HomeScreen =  observer(() => {

    const {authAction} =useAuthContext()
    const {sectionsStore, sectionsAction} = useSectionContext()

    const handleSignOut = () => {
        authAction.handleSignOut()
    }

    useEffect(() => {
        sectionsAction.loadSections()
    }, []);

    if (sectionsStore.sections.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if(sectionsStore.sections.isError){
        return (
            <View style={styles.container}>
                <Text onPress={sectionsAction.loadSections}>Try again</Text>
                <Text>Error: {sectionsStore.sections.error}</Text>
            </View>
        );
    }

    if(!sectionsStore.sections.data?.length){
        return (
            <View style={styles.container}>
                <Text>No sections</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>HOME</Text>
            <Text onPress={handleSignOut} style={styles.text}>SIGN OUT</Text>

            {sectionsStore.sections.data.map(section => (
                <Text key={section.id}>{section.name}</Text>
            ))}
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
