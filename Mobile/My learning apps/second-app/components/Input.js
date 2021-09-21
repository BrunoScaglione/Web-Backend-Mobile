import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

function Input (props)  {
    return (
        // we want some general styling for the input, so that we can use this 
        // a lot through our app
        // but we also want to give specific styling according to each situation
        // so for that, we can pass style prop(which will be an object)

        // we also will need to configure the InputText with props (like restricct what can be typed etc)
        // but we want do do it not from here, but from the place we are using this custom component
        // we can pass {...props} inside TexInput 
        // if for example, was passed a style also
        // our style here would overrite it
        // we do this, because we want to pass from StartGameScreen a couple of props that are bascially static
        <TextInput {...props} style={{...styles.input, ...props.style}}/>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default Input;