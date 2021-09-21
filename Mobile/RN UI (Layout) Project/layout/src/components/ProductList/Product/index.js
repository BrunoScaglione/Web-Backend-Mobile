import React from 'react';

import { View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles';
import uri from '../../../config/uri'

const Product = ({product: {image, title, description, price}}) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={{uri: uri}} style={styles.image}/>
      <Icon name="ios-checkmark-circle-outline" size={24} style={styles.checkIcon}/>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  </View>
);

export default Product;
