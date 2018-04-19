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
            "name":"Vlees",
            "icon": "paw"
        }
    ];

    products = {
        "Groenten": [
            {
                "name": "Sla",
                "image": "",
                "description": "Een groene krop sla",
                "price": 1.00
            },
            {
                "name": "Wortels",
                "image": "",
                "description": "10 wortels",
                "price": 3.94
            },
            {
                "name": "Bonen",
                "image": "",
                "description": "1 kg bonen",
                "price": 5.00
            }
        ],
        "Fruit": [
            {
                "name": "Bananen",
                "image": "",
                "description": "Tros bananen",
                "price": 4.77
            }
        ],
        "Vlees": [
            {
                "name": "Biefstuk",
                "image": "",
                "description": "100 gram biefstuk",
                "price": 8.99
            }
        ]
    };
}