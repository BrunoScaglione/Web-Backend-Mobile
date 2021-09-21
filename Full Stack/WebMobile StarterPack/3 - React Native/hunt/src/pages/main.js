import React, {Component} from "react";
import api from '../services/api';

import {View, Text, FlatList, TouchableOpacity} from "react-native";

class Main extends Component {
    // titulo no header, que o react navigation jah deu pra gente automaticamente 
    static navigationOptions = {
        title: "JSHunt"
    };

    state= {
        productInfo: {},
        docs: [],
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }


    // poderia fazer uma function normal com o bind (olhar tutorial react)
    // lembrando eh claro, que aqui a gente nao ta usando hooks
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;

        this.SetState({
            docs: [...this.state.docs, docs ], 
            productInfo,
            page,
        })

        // aqui tem que abir o debugger pra ver o console.log (chrome ou react native debugger que tem mais coisa)
        console.log(docs)
    };

    loadMore = () => {
        const {page, productInfo} = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({item}) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
            style={styles.productButton} 
            // navigation ta passando essas props pros compoentes dentro dele
            onPress={()=> {
                // dentro do {} podemos enviar parametros pra outra rota
                this.props.navigation.navigate('Product', {product: item})
            }}
            >
                <Text style={styles.productButtonTest}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    //quando tiver 90% da lista scrollada ele vai loadar mais
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // pra ocupar a tela inteira
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20,
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },

    productDescription: {
        fontsize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "DA552F",
        backgroundColor: 'transparant',
        justifyContent: 'center',
        alignItems: 'center',

    },

    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold"
    }
});








export default Main;