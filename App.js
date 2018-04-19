import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBarNav from 'top-bar-nav';
import Overview from './content/overview';
import Scan from './content/Scan';
import Basket from './content/basket';

const Scene = ({ index }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{index}</Text>
    </View>
);

const ROUTES = {
    Scene,
    // ideally you would have a ROUTES object with multiple React component scenes
};

const ROUTESTACK = [
    { label: 'Overview', title: (<Overview/>) }, // label is what you see in the top bar
    { label: 'Scan', title: (<Scan />) }, // title is just the name of the Component being rendered.  See the renderScene property below
    { label: 'Basket', title: (<Basket products={[]}/>) },
    { label: 'Pay', title: <View/> }
];

export default class App extends React.Component {
  render() {
      return (
          <View style={{ flex: 1}}>
              <TopBarNav
                  // routeStack and renderScene are required props
                  routeStack={ROUTESTACK}
                  renderScene={(route) => {
                          return route.title;
                  }}
                  // Below are optional props
                  headerStyle={[styles.headerStyle, { paddingTop: 40 }]} // probably want to add paddingTop: 20 if using TopBarNav for the  entire height of screen on iOS
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
