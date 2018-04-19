import React from "react";
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

export default class Scan extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef', height: 250, width: 350, marginTop: 25, marginLeft: 10}]} onPress={() => {
                    // this.returnToOverview();
                }}>
                    <Text style={styles.itemName}>Scan QR-CODE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});