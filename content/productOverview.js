import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import ProductService from '../services/productService';
import GridView from 'react-native-super-grid';

export default class ProductOverview extends React.Component {
    productService = new ProductService();

    constructor(props){
        super(props);
    }

    render() {
        let products = this.productService.getProducts(this.props.category);
        return (
            <GridView
                itemDimension={130}
                items={products}
                style={styles.gridView}
                renderItem={(item) => (
                    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef'}]} onPress={() => {
                        // console.log(item.name);
                        // this.state.items = this.productService.getProducts(item.name);
                    }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
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