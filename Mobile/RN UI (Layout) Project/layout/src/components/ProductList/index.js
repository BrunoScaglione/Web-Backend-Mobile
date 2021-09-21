import React, { Component } from 'react';

import { View } from 'react-native';

import styles from './styles';
import uri from '../../config/ReactotronConfig';
import Product from './Product';


export default class ProductList extends Component {

  state= {
      products: [
        {
          id: 1,
          image: uri,
          title: 'Title 1',
          description: 'Description 1',
          price: 'R$50,00',
        },
        {
          id: 2,
          image: uri,
          title: 'Title 2',
          description: 'Description 2',
          price: 'R$20,00',
        },
        {
          id: 3,
          image: uri,
          title: 'Title 3',
          description: 'Description 3',
          price: 'R$40,00',
        },
        {
          id: 4,
          image: uri,
          title: 'Title 4',
          description: 'Description 4',
          price: 'R$8,00',
        },

      ]
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.products.map(product =>
          <Product key={product.id} product={product}/>
        )}
      </View>
    );
  }
}
