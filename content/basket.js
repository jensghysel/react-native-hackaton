import React from 'react';
import ProductService from '../services/productService';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, FlatList, Button} from 'react-native';


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
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 1,
                    paddingBottom: 1
                }}>
                    <Text style={{fontSize: 18}}>Total</Text>
                    <Price currency="€" amount={this.props.total} style={{fontSize: 18, fontWeight: 'bold'}}/>
                </View>
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
                    <Image source={require('../img/liddellsMilk.jpg')} style={{width: 50, height: 50}}/>
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
        this.state = {products: this.props.products};
        this.myServ = new ProductService();
    }

    addProduct(product) {
        this.setState(oldState => {
            oldState.products.push(product);
            return {products: oldState.products};
        });
    }

    addProducts(products) {
        this.setState(oldState => {
            let newProducts = oldState.products.concat(products);
            return {products: newProducts};
        });
    }

    addProductsByCategory(category) {
        let products = this.myServ.getProducts(category);
        this.addProducts([].concat(products));
    }

    _onSelect = (product) => {
        this.setState(oldState => {
            product.isSelected = !product.isSelected;
            return {products: oldState.products};
        });
    }

    _onDelete = () => {
        this.setState(oldState => {
            const updatedProducts = oldState.products.filter(prod => !prod.isSelected)
            return {products: updatedProducts};
        });
    }

    _addFruit = () => {
        this.addProductsByCategory('Fruit');
    }
    _addVlees = () => {
        this.addProductsByCategory('Vlees');
    }
    _addGroenten = () => {
        this.addProductsByCategory('Groenten');
    }

    render() {
        const sum = this.state.products.reduce((accum, prod) => accum + prod.price, 0);
        const showDelete = this.state.products.filter(prod => prod.isSelected).length > 0;
        const deleteBtn = showDelete ? (<Button title="Delete product(s)" onPress={this._onDelete}/>) : (<Total total={sum}/>);
        const fruitBtn = this.state.products.length < 1 ? (
            <Button title="Add Fruit" onPress={this._addFruit}/>) : undefined;
        const vleesBtn = this.state.products.length < 1 ? (
            <Button title="Add Vlees" onPress={this._addVlees}/>) : undefined;
        const groentenhBtn = this.state.products.length < 1 ? (
            <Button title="Add Groenten" onPress={this._addGroenten}/>) : undefined;

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 30, marginBottom: 30, paddingLeft: 10, paddingRight: 10
            }}>
                {fruitBtn}
                {vleesBtn}
                {groentenhBtn}
                <ProductList products={this.state.products} onSelect={this._onSelect}></ProductList>
                {deleteBtn}

            </View>
        );
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
