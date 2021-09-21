import React from 'react';

import {View, Image, Text} from 'react-native';
import Button from '../Button';
import styles from './styles';
import uri from '../../config/uri';


const SubHeader = () => (
    <View style={styles.container}>
        <Image 
            style={styles.avatar}
            source={{uri: uri}}
        />

        <View style={styles.profileInfo}>
            <Text style={styles.name}>Neymar Jr</Text>
            <Text style={styles.bio}>Adulto ney ousadia e alegria</Text>

            <View style={styles.buttonContainer /*onLayout={ e => {}} */}>
                <Button style={styles.firstButton}>Mensagem</Button>
                <Button type="outline">Seguir</Button>
            </View>
        </View>
    </View>
);

export default SubHeader;


