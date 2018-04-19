import React from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';

export default class Pay extends React.Component {
    render(){
        return (
            <View style={[styles.gridView]}>
                <Text style={{textAlign: 'center', fontSize: 20}}>Pay with: </Text>
                <Text></Text>
                <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef'}]} onPress={() => {}}>
                    <Image source={require('../img/payconiq.jpg')} style={{padding: 10, height: 150, width: Dimensions.get('window').width}}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef'}]} onPress={() => {}}>
                    <Image source={require('../img/bancontact.png')} style={{padding: 10, height: 350, width: Dimensions.get('window').width}}></Image>
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
        borderRadius: 5
    }
});