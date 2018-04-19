import React from 'react';

export default class ProductService extends React.Component {

    constructor(){
        super();
    }

    getProducts(category) {
        return this.products[category];
    }

    getCategories() {
        return this.categories;
    }

    getProductByCode(code){
        if(code.indexOf('8714100') !== -1){
            return this.products['Dranken'][0];
        } else if(code.indexOf('781690547746') !== -1){
            return this.products['Other'][0];
        } else {
            return this.products['Groenten'][1];
        }
    }

    categories = [
        {
            "name":"Groenten",
            "icon": "pagelines"
        },
        {
            "name":"Fruit",
            "icon": "apple"
        },
        {
            "name":"Dranken",
            "icon": "beer"
        },
        {
            "name": "Other",
            "icon": "list-alt"
        }
    ];

    products = {
        "Groenten": [
            {
                "name": "Sla",
                "image": require('../img/sla.jpeg'),
                "description": "Een groene krop sla",
                "price": 1.00
            },
            {
                "name": "Wortels",
                "image": require('../img/wortels.jpg'),
                "description": "10 wortels",
                "price": 3.94
            },
            {
                "name": "Bonen",
                "image": require('../img/bonen.png'),
                "description": "1 kg bonen",
                "price": 5.00
            }
        ],
        "Fruit": [
            {
                "name": "Bananen",
                "image": require('../img/bananen.jpg'),
                "description": "Tros bananen",
                "price": 4.77
            }
        ],
        "Dranken": [
            {
                "name": "Ice-tea",
                "image": require('../img/ice-tea.jpg'),
                "description": "Een blik ice-tea",
                "price": 1.99
            }
        ],
        "Other": [
            {
                "name": "Loyalty Kaart",
                "image": require('../img/loyalty-card.png'),
                "description": "Loyalty Kaart",
                "price": 30.00
            }
        ]
    };
}