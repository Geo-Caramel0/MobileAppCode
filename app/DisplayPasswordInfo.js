import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const DisplayPasswordInfo = () => {
    const [passwords, setPasswords] = useState([]);

    const getPasswords = async () => {
        try {
            const storedPasswords = await AsyncStorage.getItem("passwords");
            console.log("Stored passwords:", storedPasswords);
            if (storedPasswords) {
                const allPasswords = JSON.parse(storedPasswords);
                setPasswords(allPasswords);
            }
        } catch (error) {
            console.error("Error retrieving passwords: ", error);
        }
    };

    useEffect(() => {
        getPasswords();
    }, []); 

    useFocusEffect(
        React.useCallback(() => {
            getPasswords();
        }, [])
    );

    const handleDeleteEntry = async (index) => {
        const updatedPasswords = passwords.filter((_, i) => i !== index);
        try {
            await AsyncStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setPasswords(updatedPasswords);
        } catch (error) {
            console.error("Error updating passwords: ", error);
        }
    };

    return (
        <ImageBackground
            source={{
                uri: "https://i.pinimg.com/736x/9e/c7/3f/9ec73f867df6f04a674a27b33780a4a2.jpg",
            }}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cell, styles.headerCell]}>Type</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Short Name</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Website or Device</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Username</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Password</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Actions</Text>
                    </View>
                    {passwords.length > 0 ? (
                        passwords.map((passwordInfo, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.cell, styles.entryText]}>{passwordInfo.type}</Text>
                                <Text style={[styles.cell, styles.entryText]}>{passwordInfo.shortName}</Text>
                                <Text style={[styles.cell, styles.entryText]}>{passwordInfo.websiteOrDevice}</Text>
                                <Text style={[styles.cell, styles.entryText]}>{passwordInfo.username}</Text>
                                <Text style={[styles.cell, styles.entryText]}>{passwordInfo.password}</Text>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteEntry(index)}
                                >
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noEntriesText}>No entries found.</Text>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        padding: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
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
        backgroundColor: "#333",
        color: "#fff",
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 8,
    },
    entryText: {
        color: "#ccc", 
    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    noEntriesText: {
        textAlign: "center",
        fontSize: 16,
        color: "#fff",
    },
});

export default DisplayPasswordInfo;







