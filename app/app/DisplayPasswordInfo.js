import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DisplayPasswordInfo = ({ route, navigation }) => {
    
    if (!route || !route.params || !route.params.passwords) {
        return <Text style={styles.errorText}>Error: Password information is missing.</Text>;
    }

    
    const { passwords } = route.params;

    
    const handleDeleteEntry = (index) => {
        
        const updatedPasswords = passwords.filter((_, i) => i !== index);
        
        navigation.setParams({ passwords: updatedPasswords });
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[styles.label, styles.headerCell]}>Type</Text>
                <Text style={[styles.label, styles.headerCell]}>Short Name</Text>
                <Text style={[styles.label, styles.headerCell]}>Website or Device</Text>
                <Text style={[styles.label, styles.headerCell]}>Username</Text>
                <Text style={[styles.label, styles.headerCell]}>Password</Text>
                <Text style={[styles.label, styles.headerCell]}>Actions</Text>
            </View>
            {passwords.map((passwordInfo, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.cell}>{passwordInfo.type}</Text>
                    <Text style={styles.cell}>{passwordInfo.shortName}</Text>
                    <Text style={styles.cell}>{passwordInfo.websiteOrDevice}</Text>
                    <Text style={styles.cell}>{passwordInfo.username}</Text>
                    <Text style={styles.cell}>{passwordInfo.password}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteEntry(index)}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        marginBottom: 10,
        alignItems: "center",
    },
    headerCell: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
    label: {
        marginBottom: 5,
        color: "#333", 
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default DisplayPasswordInfo;






