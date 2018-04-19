import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import TopBarNav from 'top-bar-nav';
import Overview from './content/overview';
import Scan from './content/Scan';
import Basket from './content/basket';

export default class App extends React.Component {

    changeView = (index) => {
        this.nav.scrollView.scrollTo({x: index * Dimensions.get('window').width});
    };

    deleteProducts = () => {
        this.setState(oldState => {
            const updatedProducts = oldState.products.filter(prod => !prod.isSelected)
            console.log(oldState.products.length + " vs " + updatedProducts.length);
            return {products: updatedProducts};
        });
    }

    onSelectProduct = (prod) => {
        this.addProduct(prod);
        this.changeView(2);
    }


    addProduct(product) {
        this.setState(oldState => {
            oldState.products.push(product);
            return {products: oldState.products};
        });
    }

    refresh() {
        this.setState(oldState => {
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

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    render() {
        console.disableYellowBox = true;
        this.ROUTESTACK = [
            {label: 'Overview', title: (<Overview onSelectProduct={this.onSelectProduct}/>)}, // label is what you see in the top bar
            {label: 'Scan', title: (<Scan changeView={this.changeView}/>)}, // title is just the name of the Component being rendered.  See the renderScene property below
            {label: 'Basket', title: (<Basket products={this.state.products} deleteProducts={this.deleteProducts} refresh={this.refresh.bind(this)}/>) },
            {label: 'Pay', title: <View/>}
        ];
        console.log("refreshing");
        return (
            <View style={{flex: 1}}>
                <TopBarNav
                    ref={(element) => this.nav = element}
                    // routeStack and renderScene are required props
                    routeStack={this.ROUTESTACK}
                    renderScene={(route) => {
                        return route.title;
                    }}
                    // Below are optional props
                    headerStyle={[styles.headerStyle, {paddingTop: 40}]} // probably want to add paddingTop: 20 if using TopBarNav for the  entire height of screen on iOS
                    labelStyle={styles.labelStyle}
                    underlineStyle={styles.underlineStyle}
                    imageStyle={styles.imageStyle}
                    sidePadding={0} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
                    inactiveOpacity={1}
                    fadeLabels={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        borderBottomWidth: 1,
        borderColor: '#e6faff',
        backgroundColor: '#00aeef'
    },
    labelStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    imageStyle: {
        height: 20,
        width: 20,
        tintColor: '#e6faff'
    },
    underlineStyle: {
        height: 3.6,
        backgroundColor: '#e6faff'
    }
});
