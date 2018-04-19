import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, FlatList, Button} from 'react-native';
import renderIf from '../util/renderIf';


class Price extends React.Component {
    render() {
        return (
            <Text style={this.props.style}>{this.props.currency} {this.props.amount}</Text>
        );
    }
}

class Total extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: 1,
                paddingBottom: 1
            }}>
                <Text style={{fontSize: 18}}>Total</Text>
                <Price currency="€" amount={this.props.total} style={{fontSize: 18, fontWeight: 'bold'}}/>
            </View>
        );
    }
}

class Product extends React.Component {
    _onPressButton = () => {
        this.props.onPress(this.props.product);
    }

    render() {
        let bgColor = this.props.product.isSelected ? '#CCC' : '#FFF';
        return (
            <TouchableOpacity underlayColor='black' key={this.props.product.name} onPress={this._onPressButton}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: bgColor
                }}>
                    <Image source={this.props.product.image} style={{width: 50, height: 50}}/>
                    <Text>{this.props.product.description}</Text>
                    <Price currency="€" amount={this.props.product.price}/>
                </View>
            </TouchableOpacity>
        );
    }
}


class ProductList extends React.Component {
    _onPressItem = (product) => {
        this.props.onSelect(product);
    }

    render() {
        const renderedProducts = this.props.products.map(product => (
            <Product product={product} key={product.name} onPress={this._onPressItem}/>));

        return (
            <ScrollView >
                { renderedProducts }
            </ScrollView>
        );
    }
}

export default class Basket extends React.Component {

    constructor(props) {
        super(props);
    }

    _onSelect = (product) => {
        product.isSelected = !product.isSelected;
        this.props.refresh();
    }

    _onDelete = () => {
        this.props.deleteProducts();
    }

    render() {
        const sum = this.props.products.reduce((accum, prod) => accum + prod.price, 0);
        const roundedSum = sum.toFixed(2);
        const hasProds = this.props.products.length > 0;
        const showDelete = this.props.products.filter(prod => prod.isSelected).length > 0;
        const deleteBtn = showDelete ? (<Button title="Delete product(s)" onPress={this._onDelete}/>) : hasProds ? (
            <Total total={roundedSum}/>) : <View/>;
        //const noProducts = !hasProds ? <Text>Kies producten via het overview of scan nieuwe items.</Text> : <View/>;
        //const direction = hasProds ? "space-between" : "space-around";

        if (hasProds) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 10
                }}>
                    <ProductList products={this.props.products} onSelect={this._onSelect}></ProductList>
                    {deleteBtn}
                </View>
            );
        } else {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 10
                }}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>Kies producten via het overview of scan nieuwe items.</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
