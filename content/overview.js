import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ProductService from '../services/productService';
import GridView from 'react-native-super-grid';
import ProductOverview from './productOverview';
import renderIf from '../util/renderIf';

export default class Overview extends React.Component {
    productService = new ProductService();

    constructor() {
        super();
        this.state = {
            category: 'Groenten',
            showOverview: true,
            showProducts: false
        };
    }

    render() {
        let categories = this.productService.getCategories();
        return (
            <View style={{flex: 1}}>
                {renderIf(this.state.showOverview)(
                    <GridView
                        itemDimension={130}
                        items={categories}
                        style={styles.gridView}
                        renderItem={(item) => (
                            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef'}]} onPress={() => {
                                this.showCategory(item.name);
                            }}>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                {renderIf(this.state.showProducts)(
                    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: '#00aeef', height: 45, width: 350, marginTop: 25, marginLeft: 10}]} onPress={() => {
                        this.returnToOverview();
                    }}>
                        <Text style={styles.itemName}>Return to overview</Text>
                    </TouchableOpacity>
                )}
                {renderIf(this.state.showProducts)(
                    <ProductOverview category={this.state.category}/>
                )}
            </View>
        );
    }

    returnToOverview(){
        this.setState({
            category: 'Groenten',
            showOverview: true,
            showProducts: false
        });
    }

    showCategory(category) {
        this.setState({
            category: category,
            showOverview: false,
            showProducts: true
        });
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