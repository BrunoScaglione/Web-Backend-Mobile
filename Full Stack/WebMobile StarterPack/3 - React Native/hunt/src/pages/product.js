import React from 'react';
import {WebView} from "react-native"

const Product = () => (
    <Text>Product</Text>
);

// vamos usar webview para  mostrar a pagina como se o usuario estivesse no brpwser
const Product =  ({navigation}) => (

    <WebView source={{uri: navigation.state.params.product.url}}></WebView>
)


// podemos utilizar ele em formatto de funcao
// estamos recebendo as props como argumento, e desestruturando para pegar navigation
Product.navigationOptions = ({navigation}) => ({
    title: navigation.state.params.product.title
})




export default Product;