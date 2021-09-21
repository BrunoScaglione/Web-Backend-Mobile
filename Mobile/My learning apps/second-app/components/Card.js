import React from 'react';
import { View, StyleSheet } from 'react-native';

////IMPORTANT : props.children is a special component in react, which 
// is basically the content you pass between the opening and closing tags
// of your custom component
// so it can wrap itself around any content
// because the goal of this Card component is to provide a Card like styling to
// wrap content around in our aplication

////WE ARE GOING TO PUT THIS COMPONENT OPENING AND CLOSING TAGS IN StarGamescreen
// because its a styling component (because of props.children )
{/* <Card>
    Something
</Card> */}


const styles = StyleSheet.create({
    card: {
        // not every card should do this
        // width: 300,
        // maxWidth: '80%',
        // alignItems: 'center',


        ///// shadow properties only work on IOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        /// for android its just elevation: a number (it has already configured the shadow)
        elevation: 5, // you can tune by changing this number
        padding: 20,
        borderRadius: 10,
    }
})

function Card (props) {
    return (
        // we= can add more styles via props 
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

export default Card


